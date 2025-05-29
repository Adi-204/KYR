// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from "next/navigation"; 

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary ml-4" />
            <Link href="/">
              <span className="text-xl font-bold">KYR</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link href="/test" className="text-sm font-medium transition-colors hover:text-primary">
                Test
              </Link>
              <Link href="/review" className="text-sm font-medium transition-colors hover:text-primary">
                AI Review
              </Link>
            </nav>

            <div className="flex items-center space-x-4 mr-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={() => handleLogout()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button>
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}