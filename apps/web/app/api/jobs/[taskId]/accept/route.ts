import { NextResponse } from 'next/server';
import { postWorkerJson } from '@/lib/server/human-proxy-api';

type Params = {
  params: Promise<{ taskId: string }>;
};

export async function POST(_request: Request, { params }: Params) {
  const { taskId } = await params;
  const result = await postWorkerJson(`/v1/jobs/${taskId}/accept`);
  return NextResponse.json(result.body, { status: result.status });
}
