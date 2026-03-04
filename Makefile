.PHONY: docs-check

docs-check:
	bash platform/scripts/check-doc-metadata.sh

.PHONY: risk-check
risk-check:
	bash platform/scripts/check-risky-change.sh
