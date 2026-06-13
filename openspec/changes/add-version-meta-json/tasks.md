## 1. Static Metadata Endpoint

- [x] 1.1 Create `site/meta.json` with schemaVersion, latestVersion, proReleasedAt, lifecycle, downloadUrl, releaseNotesUrl, announcements, and riskBlock.
- [x] 1.2 Add `/meta.json` headers in `site/_headers` for JSON content type and short cache TTL.

## 2. Contract Validation

- [x] 2.1 Add `scripts/validate-meta-json.mjs` using Node built-ins and no new dependencies.
- [x] 2.2 Validate top-level fields, semver, ISO datetime/null, lifecycle enum, URL allowlist, announcement limits, and riskBlock constraints.
- [x] 2.3 Ensure invalid metadata exits non-zero with a readable validation error.

## 3. Verification

- [x] 3.1 Run the validator against `site/meta.json` and confirm it passes.
- [x] 3.2 Run `pnpm build` in `docs/` to confirm docs build remains clean.
- [x] 3.3 Search the repo for `meta.json` references and confirm the endpoint/header/script are present.

## 4. Release

- [ ] 4.1 Commit only scoped Cloudflare meta endpoint files plus OpenSpec artifacts.
- [ ] 4.2 Push to `origin/main` to trigger Cloudflare Pages deploy.
- [ ] 4.3 After deploy, verify `curl -i https://useknowme.com/meta.json` shows JSON, short TTL, and no HTML response.
