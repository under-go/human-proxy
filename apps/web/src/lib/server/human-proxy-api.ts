import 'server-only';
import crypto from 'node:crypto';

type ForwardResult = {
  status: number;
  body: unknown;
};

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8080';

function normalizeBaseUrl(raw?: string) {
  const candidate = (raw ?? '').trim();
  if (!candidate) {
    return DEFAULT_API_BASE_URL;
  }
  return candidate.endsWith('/') ? candidate.slice(0, -1) : candidate;
}

function canonicalPayload(
  method: string,
  path: string,
  timestamp: string,
  nonce: string,
  idempotencyKey: string
) {
  return `${method}\n${path}\n${timestamp}\n${nonce}\n${idempotencyKey}`;
}

function signHmacSha256(secret: string, payload: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

function resolveApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = normalizeBaseUrl(process.env.HUMAN_PROXY_API_BASE_URL);
  return {
    path: normalizedPath,
    url: `${baseUrl}${normalizedPath}`
  };
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return { code: 'UPSTREAM_RESPONSE_INVALID_JSON', message: 'Failed to parse upstream JSON response' };
    }
  }
  return { message: await response.text() };
}

export async function postAgentJson(
  path: string,
  payload: unknown,
  idempotencyKey?: string
): Promise<ForwardResult> {
  const method = 'POST';
  const { url, path: resolvedPath } = resolveApiUrl(path);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomUUID();
  const idem = idempotencyKey?.trim() ? idempotencyKey : `idem-${crypto.randomUUID()}`;
  const agentApiKey = process.env.HUMAN_PROXY_AGENT_API_KEY ?? 'hp_test_key';
  const signingSecret = process.env.HUMAN_PROXY_AGENT_SIGNING_SECRET ?? 'hp-dev-signing-secret';
  const signature = signHmacSha256(signingSecret, canonicalPayload(method, resolvedPath, timestamp, nonce, idem));

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-HP-API-KEY': agentApiKey,
        'X-HP-TIMESTAMP': timestamp,
        'X-HP-NONCE': nonce,
        'X-HP-SIGNATURE': signature,
        'Idempotency-Key': idem
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    return { status: response.status, body: await parseResponseBody(response) };
  } catch {
    return {
      status: 502,
      body: { code: 'UPSTREAM_UNREACHABLE', message: 'Failed to reach Human Proxy API server' }
    };
  }
}

export async function postWorkerJson(path: string, payload?: unknown): Promise<ForwardResult> {
  const { url } = resolveApiUrl(path);
  const workerToken = process.env.HUMAN_PROXY_WORKER_BEARER_TOKEN ?? 'demo-worker-token';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${workerToken}`
      },
      body: payload === undefined ? undefined : JSON.stringify(payload),
      cache: 'no-store'
    });

    return { status: response.status, body: await parseResponseBody(response) };
  } catch {
    return {
      status: 502,
      body: { code: 'UPSTREAM_UNREACHABLE', message: 'Failed to reach Human Proxy API server' }
    };
  }
}
