// app/api/auth/check/route.ts
import { getAuthenticatedUser } from "@/app/utils/auth";

export async function GET() {
  const user = await getAuthenticatedUser();
  return Response.json({ user });
}

