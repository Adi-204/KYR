// app/api/auth/[...nextauth]/options.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/lib/models/User";
import dbConnect from "@/app/lib/db/connect";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          console.log("Attempting to find/create user:", user.email);

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              firstName: profile?.name || user.name?.split(' ')[0],
              lastName: profile?.name || user.name?.split(' ')[1] || '',
              provider: 'google'
            });
            console.log("New user created:", newUser);
            user.id = newUser._id.toString();
          } else {
            console.log("Existing user found:", existingUser);
            user.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Database error during signIn:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // Verify user exists in database
        await dbConnect();
        const dbUser = await User.findById(token.id);
        if (!dbUser) {
          console.error("User not found in database!");
          throw new Error("User not found");
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
