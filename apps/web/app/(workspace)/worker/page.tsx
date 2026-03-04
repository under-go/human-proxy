import { redirect } from 'next/navigation';

export default function WorkerEntryPage() {
  redirect('/worker/jobs');
}
