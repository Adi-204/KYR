// src/lib/utils/auth.ts
"use server";

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/options';

export interface AuthUser {
  id: string;
}

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  // 1. Check NextAuth session first
  const session = await getServerSession(authOptions);
  
  if (session?.user) {
    return { 
      id: session.user.id,
    };
  }

  // 2. Fallback to JWT token check
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return { 
      id: payload.id as string,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
