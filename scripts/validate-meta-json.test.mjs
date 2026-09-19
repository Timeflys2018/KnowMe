import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'

const meta = JSON.parse(readFileSync(new URL('../site/meta.json', import.meta.url), 'utf8'))

describe('release announcement metadata', () => {
  it('does not target clients already on the announced version', () => {
    assert.equal(meta.announcements[0].affectedBelow, meta.latestVersion)
  })
})
