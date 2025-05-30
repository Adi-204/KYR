import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full h-[10vh] border-t bg-background py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Centered copyright */}
        <div className="text-sm text-muted-foreground mx-auto">
          © 2025 KYR. All rights reserved.
        </div>

        {/* Socials on right */}
        <div className="flex gap-4 absolute right-4">
          <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
            <Facebook className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
            <Twitter className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
            <Instagram className="w-4 h-4" />
          </Link>
          <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
            <Github className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
