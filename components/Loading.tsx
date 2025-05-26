// components/Loading.tsx
"use client";

import { Loader2 } from "lucide-react"; // Lucide icons are used in ShadCN
import { cn } from "@/lib/utils"; // ShadCN utility to combine classNames

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="ml-4 text-lg text-muted-foreground">Loading...</span>
    </div>
  );
}
