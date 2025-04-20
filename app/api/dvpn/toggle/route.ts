import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { userId, active } = await request.json();

  // Here, you would call your dVPN service API to enable/disable the connection
  // For now, we'll just update the status in the database
  const { data, error } = await supabase
    .from('dvpn_status')
    .upsert({ user_id: userId, is_active: active, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error('Error toggling dVPN:', error);
    return NextResponse.json({ error: 'Failed to toggle dVPN' }, { status: 500 });
  }

  return NextResponse.json({ is_active: data.is_active });
}
