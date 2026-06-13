#!/usr/bin/env node
import fs from 'node:fs'

const file = process.argv[2] ?? 'site/meta.json'
const text = fs.readFileSync(file, 'utf8')
const meta = JSON.parse(text)
const errors = []

const semverRe = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/
const isoDateRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/
const lifecycleValues = new Set(['active', 'maintenance', 'sunset'])
const announcementLevels = new Set(['info', 'warn'])
const carriers = new Set(['toast', 'banner'])
const riskClasses = new Set(['security', 'data-corruption', 'cloud-misuse', 'protocol-deprecation', 'legal'])
const expectedKeys = ['schemaVersion', 'latestVersion', 'proReleasedAt', 'lifecycle', 'downloadUrl', 'releaseNotesUrl', 'announcements', 'riskBlock']

function fail(path, message) {
  errors.push(`${path}: ${message}`)
}

function checkExactTopLevelKeys() {
  const keys = Object.keys(meta).sort()
  const expected = [...expectedKeys].sort()
  if (JSON.stringify(keys) !== JSON.stringify(expected)) {
    fail('$', `expected exact top-level keys ${expected.join(', ')}, got ${keys.join(', ')}`)
  }
}

function checkString(path, value, maxLength) {
  if (typeof value !== 'string') {
    fail(path, 'must be a string')
    return false
  }
  if (value.length > maxLength) fail(path, `must be <= ${maxLength} characters`)
  return true
}

function checkIsoDateOrNull(path, value) {
  if (value === null) return
  if (typeof value !== 'string' || !isoDateRe.test(value) || Number.isNaN(Date.parse(value))) {
    fail(path, 'must be an ISO datetime string ending in Z, or null')
  }
}

function checkUrl(path, value) {
  if (!checkString(path, value, 2048)) return
  let url
  try {
    url = new URL(value)
  } catch {
    fail(path, 'must be a valid URL')
    return
  }
  if (url.protocol !== 'https:') fail(path, 'must use https:')

  if (url.hostname === 'useknowme.com') return
  if (url.hostname === 'download.useknowme.com') return
  if (url.hostname === 'github.com' && url.pathname.startsWith('/Timeflys2018/knowme/')) return

  fail(path, 'host/path is not in the version metadata allowlist')
}

function checkCta(path, cta) {
  if (cta === undefined) return
  if (!cta || typeof cta !== 'object' || Array.isArray(cta)) {
    fail(path, 'must be an object when present')
    return
  }
  const keys = Object.keys(cta).sort()
  const expected = ['label', 'url']
  if (JSON.stringify(keys) !== JSON.stringify(expected)) fail(path, 'must contain exactly label and url')
  checkString(`${path}.label`, cta.label, 40)
  checkUrl(`${path}.url`, cta.url)
}

function checkAnnouncement(a, i) {
  const path = `$.announcements[${i}]`
  if (!a || typeof a !== 'object' || Array.isArray(a)) {
    fail(path, 'must be an object')
    return
  }
  const allowed = new Set(['id', 'level', 'carrier', 'title', 'body', 'cta', 'startsAt', 'expiresAt'])
  for (const key of Object.keys(a)) if (!allowed.has(key)) fail(`${path}.${key}`, 'unknown key')

  checkString(`${path}.id`, a.id, 100)
  if (!announcementLevels.has(a.level)) fail(`${path}.level`, 'must be info or warn')
  if (!carriers.has(a.carrier)) fail(`${path}.carrier`, 'must be toast or banner')
  checkString(`${path}.title`, a.title, 120)
  checkString(`${path}.body`, a.body, 500)
  checkCta(`${path}.cta`, a.cta)
  if (a.startsAt !== undefined) checkIsoDateOrNull(`${path}.startsAt`, a.startsAt)
  if (a.expiresAt !== undefined) checkIsoDateOrNull(`${path}.expiresAt`, a.expiresAt)
}

function checkRiskBlock(value) {
  if (value === null) return
  const path = '$.riskBlock'
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(path, 'must be null or an object')
    return
  }
  const keys = Object.keys(value).sort()
  const expected = ['affectedBelow', 'downloadUrl', 'reason', 'riskClass'].sort()
  if (JSON.stringify(keys) !== JSON.stringify(expected)) fail(path, 'must contain exactly riskClass, affectedBelow, reason, downloadUrl')
  if (!riskClasses.has(value.riskClass)) fail(`${path}.riskClass`, 'must be a known risk class')
  if (typeof value.affectedBelow !== 'string' || !semverRe.test(value.affectedBelow)) fail(`${path}.affectedBelow`, 'must be semver')
  checkString(`${path}.reason`, value.reason, 500)
  checkUrl(`${path}.downloadUrl`, value.downloadUrl)
}

checkExactTopLevelKeys()

if (meta.schemaVersion !== 1) fail('$.schemaVersion', 'must be exactly 1')
if (typeof meta.latestVersion !== 'string' || !semverRe.test(meta.latestVersion)) fail('$.latestVersion', 'must be semver')
checkIsoDateOrNull('$.proReleasedAt', meta.proReleasedAt)
if (!lifecycleValues.has(meta.lifecycle)) fail('$.lifecycle', 'must be active, maintenance, or sunset')
checkUrl('$.downloadUrl', meta.downloadUrl)
checkUrl('$.releaseNotesUrl', meta.releaseNotesUrl)

if (!Array.isArray(meta.announcements)) {
  fail('$.announcements', 'must be an array')
} else {
  if (meta.announcements.length > 10) fail('$.announcements', 'must contain <= 10 items')
  meta.announcements.forEach(checkAnnouncement)
}

checkRiskBlock(meta.riskBlock)

if (errors.length > 0) {
  console.error(`Invalid ${file}:`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`${file} is valid`)
