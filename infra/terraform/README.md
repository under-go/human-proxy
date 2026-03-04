# Terraform

## Directory
- `env/dev`
- `env/staging`
- `env/prod`

Each environment is currently a bootstrap entrypoint and will be expanded in phases.

## Current Scope (Phase 1)
- Keep `fmt/validate/plan` healthy in CI
- Define backend and env variable templates only
- Avoid direct ClickOps drift

## Files Added Per Environment
- `backend.hcl.example`: remote state backend sample
- `terraform.tfvars.example`: required input sample

## Local Commands
- `terraform -chdir=infra/terraform fmt -recursive`
- `terraform -chdir=infra/terraform/env/dev init -backend=false`
- `terraform -chdir=infra/terraform/env/dev validate`
- `terraform -chdir=infra/terraform/env/dev plan -lock=false`

## Notes
- CI uses `-backend=false` until real backend wiring is merged.
- Real modules (network/compute/data/observability) are intentionally deferred.
