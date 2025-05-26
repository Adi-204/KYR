// app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/options';
import { getServerSession } from "next-auth";

export async function POST() {
  (await cookies()).delete('auth-token');
  const session = await getServerSession(authOptions);
  if (session) {
    (await cookies()).delete('next-auth.session-token');
    (await cookies()).delete('next-auth.csrf-token');
    (await cookies()).delete('next-auth.callback-url');
  }
  return NextResponse.json({ success: true });
}

