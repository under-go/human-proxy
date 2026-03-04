import { NextRequest, NextResponse } from 'next/server';
import { postWorkerJson } from '@/lib/server/human-proxy-api';

type Params = {
  params: Promise<{ taskId: string }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  const { taskId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { code: 'REQUEST_BODY_INVALID', message: 'JSON body is required' },
      { status: 400 }
    );
  }

  const result = await postWorkerJson(`/v1/jobs/${taskId}/submissions`, body);
  return NextResponse.json(result.body, { status: result.status });
}
