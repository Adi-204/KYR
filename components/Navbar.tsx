"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Menu } from "lucide-react"
import { useAuth } from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation"
import Loading from "./Loading"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const pathname = usePathname()

  const ishomePage = pathname === "/";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  if(loading && ishomePage){
    return <Loading />
  }

  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between py-6">
          <Link href="/">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary ml-4" />
              <span className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">KYR</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <Link href="/test" className="text-base font-medium transition-colors hover:text-primary relative group">
                Test
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/review"
                className="text-base font-medium transition-colors hover:text-primary relative group"
              >
                AI Review
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4 mr-4">
              {user ? (
                <>
                  <Button
                    onClick={() => handleLogout()}
                    size="lg"
                    className="font-medium bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="font-medium hover:bg-primary cursor-pointer"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="font-medium bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                    >
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
  )
}
