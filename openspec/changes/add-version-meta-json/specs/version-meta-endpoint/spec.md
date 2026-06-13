## ADDED Requirements

### Requirement: Public version metadata endpoint
The public site SHALL expose a static version metadata JSON document at `/meta.json` for the desktop app to consume.

#### Scenario: Metadata file is present
- **WHEN** the public site is built or served from the `site/` directory
- **THEN** `/meta.json` SHALL exist as a static JSON file.

#### Scenario: Metadata contains required top-level fields
- **WHEN** `/meta.json` is parsed as JSON
- **THEN** it SHALL contain `schemaVersion`, `latestVersion`, `proReleasedAt`, `lifecycle`, `downloadUrl`, `releaseNotesUrl`, `announcements`, and `riskBlock`.

### Requirement: Metadata contract validation
The repository SHALL include a local validator that rejects metadata violating the desktop contract before deployment.

#### Scenario: Valid metadata passes validation
- **WHEN** the validator is run against `site/meta.json`
- **THEN** it SHALL exit successfully for a document matching the version-nudge contract.

#### Scenario: Invalid metadata fails validation
- **WHEN** required fields, enums, dates, URL hosts, lengths, announcement count, or `riskBlock` constraints are invalid
- **THEN** the validator SHALL exit with a non-zero status and print the failing rule.

### Requirement: Metadata endpoint cache and content headers
Cloudflare Pages SHALL serve `/meta.json` with JSON content type and a short cache lifetime.

#### Scenario: Headers are configured for metadata
- **WHEN** Cloudflare Pages applies `site/_headers`
- **THEN** `/meta.json` SHALL have `Content-Type: application/json; charset=utf-8` and `Cache-Control: public, max-age=300, must-revalidate`.

### Requirement: No backend or tracking for metadata
The metadata endpoint SHALL remain a static, non-tracking Pages artifact.

#### Scenario: No runtime service is added
- **WHEN** this change is implemented
- **THEN** it SHALL NOT add a Cloudflare Worker, KV-backed management API, license service, account system, user tracking, or download proxy.
