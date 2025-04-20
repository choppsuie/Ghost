import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { userId } = await request.json();

  // Here, you would call your VM provider's API to stop the VM
  // For now, we'll just update the status in the database
  const { data, error } = await supabase
    .from('vm_status')
    .upsert({ user_id: userId, status: 'stopped', updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error('Error stopping VM:', error);
    return NextResponse.json({ error: 'Failed to stop VM' }, { status: 500 });
  }

  return NextResponse.json({ status: data.status });
}
