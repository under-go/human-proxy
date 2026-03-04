-- Human Proxy KR v1 baseline schema
-- PostgreSQL 15+

CREATE TABLE IF NOT EXISTS accounts (
  account_id UUID PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  display_name VARCHAR(80) NOT NULL,
  locale VARCHAR(10) NOT NULL DEFAULT 'ko-KR',
  status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'SUSPENDED', 'CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_accounts_email_ci ON accounts ((LOWER(email)));

CREATE TABLE IF NOT EXISTS account_roles (
  account_id UUID NOT NULL REFERENCES accounts(account_id),
  role_code VARCHAR(24) NOT NULL
    CHECK (role_code IN ('OWNER', 'WORKER', 'ADMIN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (account_id, role_code)
);

CREATE TABLE IF NOT EXISTS api_credentials (
  credential_id UUID PRIMARY KEY,
  owner_account_id UUID NOT NULL REFERENCES accounts(account_id),
  key_prefix VARCHAR(16) NOT NULL,
  key_hash VARCHAR(255) NOT NULL,
  signature_algo VARCHAR(24) NOT NULL DEFAULT 'HMAC_SHA256',
  status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  UNIQUE (owner_account_id, key_prefix)
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id UUID PRIMARY KEY,
  owner_account_id UUID NOT NULL REFERENCES accounts(account_id),
  prompt TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  category VARCHAR(40) NOT NULL,
  status VARCHAR(32) NOT NULL
    CHECK (
      status IN (
        'OPEN',
        'CLAIMED',
        'IN_PROGRESS',
        'SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'REVISION_REQUESTED',
        'REJECTED',
        'SETTLED',
        'CLOSED'
      )
    ),
  reward_amount_krw BIGINT NOT NULL CHECK (reward_amount_krw > 0),
  fee_amount_krw BIGINT NOT NULL CHECK (fee_amount_krw >= 0),
  deadline_at TIMESTAMPTZ NOT NULL,
  idempotency_key VARCHAR(80),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  claimed_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_account_id, idempotency_key)
);

CREATE INDEX IF NOT EXISTS idx_tasks_owner_status ON tasks (owner_account_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_status_deadline ON tasks (status, deadline_at);

CREATE TABLE IF NOT EXISTS task_assignments (
  assignment_id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  worker_account_id UUID NOT NULL REFERENCES accounts(account_id),
  assignment_status VARCHAR(24) NOT NULL
    CHECK (assignment_status IN ('CLAIMED', 'WITHDRAWN', 'EXPIRED', 'COMPLETED')),
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_task_assignment_active
  ON task_assignments (task_id)
  WHERE assignment_status = 'CLAIMED';

CREATE INDEX IF NOT EXISTS idx_task_assignments_worker_status
  ON task_assignments (worker_account_id, assignment_status);

CREATE TABLE IF NOT EXISTS submissions (
  submission_id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  assignment_id UUID REFERENCES task_assignments(assignment_id),
  submitter_account_id UUID NOT NULL REFERENCES accounts(account_id),
  revision_no INT NOT NULL CHECK (revision_no >= 1),
  text_content TEXT NOT NULL,
  image_url TEXT,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  submission_status VARCHAR(24) NOT NULL
    CHECK (submission_status IN ('SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUESTED', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, revision_no)
);

CREATE INDEX IF NOT EXISTS idx_submissions_task_status
  ON submissions (task_id, submission_status);

CREATE TABLE IF NOT EXISTS reviews (
  review_id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  submission_id UUID NOT NULL REFERENCES submissions(submission_id),
  reviewer_account_id UUID NOT NULL REFERENCES accounts(account_id),
  decision VARCHAR(24) NOT NULL
    CHECK (decision IN ('APPROVED', 'REVISION_REQUESTED', 'REJECTED')),
  reason_code VARCHAR(64),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_task_created ON reviews (task_id, created_at DESC);

CREATE TABLE IF NOT EXISTS escrow_holds (
  hold_id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  owner_account_id UUID NOT NULL REFERENCES accounts(account_id),
  amount_krw BIGINT NOT NULL CHECK (amount_krw > 0),
  hold_status VARCHAR(24) NOT NULL
    CHECK (hold_status IN ('HELD', 'RELEASED', 'REFUNDED', 'SETTLED')),
  held_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_task_hold_active
  ON escrow_holds (task_id)
  WHERE hold_status = 'HELD';

CREATE TABLE IF NOT EXISTS wallet_accounts (
  wallet_id UUID PRIMARY KEY,
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(account_id),
  available_balance_krw BIGINT NOT NULL DEFAULT 0,
  pending_balance_krw BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ledger_entries (
  ledger_entry_id BIGSERIAL PRIMARY KEY,
  account_id UUID REFERENCES accounts(account_id),
  task_id UUID REFERENCES tasks(task_id),
  hold_id UUID REFERENCES escrow_holds(hold_id),
  entry_type VARCHAR(40) NOT NULL,
  direction VARCHAR(16) NOT NULL CHECK (direction IN ('DEBIT', 'CREDIT')),
  amount_krw BIGINT NOT NULL CHECK (amount_krw > 0),
  balance_after_krw BIGINT,
  entry_status VARCHAR(24) NOT NULL
    CHECK (entry_status IN ('PENDING', 'COMPLETED', 'REVERSED')),
  idempotency_key VARCHAR(80),
  reference_type VARCHAR(40),
  reference_id VARCHAR(80),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_ledger_entry_idempotency
  ON ledger_entries (account_id, entry_type, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ledger_entries_account_time
  ON ledger_entries (account_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS settlement_batches (
  settlement_batch_id UUID PRIMARY KEY,
  batch_code VARCHAR(40) NOT NULL UNIQUE,
  batch_status VARCHAR(24) NOT NULL
    CHECK (batch_status IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIAL')),
  scheduled_for DATE NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  failure_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settlement_items (
  settlement_item_id UUID PRIMARY KEY,
  settlement_batch_id UUID NOT NULL REFERENCES settlement_batches(settlement_batch_id),
  worker_account_id UUID NOT NULL REFERENCES accounts(account_id),
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  gross_amount_krw BIGINT NOT NULL CHECK (gross_amount_krw > 0),
  fee_amount_krw BIGINT NOT NULL CHECK (fee_amount_krw >= 0),
  net_amount_krw BIGINT NOT NULL CHECK (net_amount_krw >= 0),
  payout_status VARCHAR(24) NOT NULL
    CHECK (payout_status IN ('QUEUED', 'PROCESSING', 'PAID', 'FAILED', 'CANCELED', 'ON_HOLD')),
  payout_provider VARCHAR(24) NOT NULL DEFAULT 'LATPEED',
  payout_provider_ref VARCHAR(120),
  failure_reason TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id)
);

CREATE INDEX IF NOT EXISTS idx_settlement_items_batch_status
  ON settlement_items (settlement_batch_id, payout_status);

CREATE TABLE IF NOT EXISTS disputes (
  dispute_id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(task_id),
  opener_account_id UUID NOT NULL REFERENCES accounts(account_id),
  counterpart_account_id UUID REFERENCES accounts(account_id),
  dispute_status VARCHAR(24) NOT NULL
    CHECK (dispute_status IN ('OPEN', 'UNDER_REVIEW', 'RESOLVED_OWNER', 'RESOLVED_WORKER', 'CLOSED')),
  reason_code VARCHAR(64) NOT NULL,
  detail TEXT,
  resolution_note TEXT,
  resolved_by_account_id UUID REFERENCES accounts(account_id),
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_dispute_open_per_task
  ON disputes (task_id)
  WHERE dispute_status IN ('OPEN', 'UNDER_REVIEW');

CREATE TABLE IF NOT EXISTS webhook_subscriptions (
  subscription_id UUID PRIMARY KEY,
  owner_account_id UUID NOT NULL REFERENCES accounts(account_id),
  target_url TEXT NOT NULL,
  event_mask JSONB NOT NULL DEFAULT '[]'::jsonb,
  secret_hash VARCHAR(255) NOT NULL,
  status VARCHAR(24) NOT NULL
    CHECK (status IN ('ACTIVE', 'DISABLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inbound_webhook_events (
  inbound_event_id UUID PRIMARY KEY,
  provider VARCHAR(24) NOT NULL,
  provider_event_id VARCHAR(120) NOT NULL,
  event_type VARCHAR(80) NOT NULL,
  signature_timestamp VARCHAR(40),
  signature_value VARCHAR(255),
  payload JSONB NOT NULL,
  processing_status VARCHAR(24) NOT NULL
    CHECK (processing_status IN ('RECEIVED', 'PROCESSED', 'FAILED', 'IGNORED')),
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  UNIQUE (provider, provider_event_id)
);

CREATE TABLE IF NOT EXISTS outbox_events (
  outbox_event_id UUID PRIMARY KEY,
  aggregate_type VARCHAR(40) NOT NULL,
  aggregate_id VARCHAR(80) NOT NULL,
  event_type VARCHAR(80) NOT NULL,
  payload JSONB NOT NULL,
  publish_status VARCHAR(24) NOT NULL
    CHECK (publish_status IN ('PENDING', 'PUBLISHED', 'FAILED')),
  retry_count INT NOT NULL DEFAULT 0,
  available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outbox_publish_queue
  ON outbox_events (publish_status, available_at);

CREATE TABLE IF NOT EXISTS audit_logs (
  audit_log_id BIGSERIAL PRIMARY KEY,
  actor_account_id UUID REFERENCES accounts(account_id),
  actor_type VARCHAR(24) NOT NULL,
  action VARCHAR(80) NOT NULL,
  target_type VARCHAR(40) NOT NULL,
  target_id VARCHAR(80) NOT NULL,
  before_snapshot JSONB,
  after_snapshot JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_target
  ON audit_logs (target_type, target_id, created_at DESC);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_task_assignments_updated_at
  BEFORE UPDATE ON task_assignments
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_escrow_holds_updated_at
  BEFORE UPDATE ON escrow_holds
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_wallet_accounts_updated_at
  BEFORE UPDATE ON wallet_accounts
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_settlement_batches_updated_at
  BEFORE UPDATE ON settlement_batches
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_settlement_items_updated_at
  BEFORE UPDATE ON settlement_items
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_webhook_subscriptions_updated_at
  BEFORE UPDATE ON webhook_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
