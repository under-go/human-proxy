import { NextRequest, NextResponse } from 'next/server';
import { postAgentJson } from '@/lib/server/human-proxy-api';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { code: 'REQUEST_BODY_INVALID', message: 'JSON body is required' },
      { status: 400 }
    );
  }

  const idempotencyKey = request.headers.get('Idempotency-Key') ?? undefined;
  const result = await postAgentJson('/v1/agent/tasks', body, idempotencyKey);
  return NextResponse.json(result.body, { status: result.status });
}
