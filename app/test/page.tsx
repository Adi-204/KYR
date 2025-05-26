import type { Metadata } from "next"
import Instruction from "./Instruction"
import ProtectedRoute from "@/components/ProtectedRoute"

export const metadata: Metadata = {
  title: "Test Instructions | Know Your Resume - Prepare for Your Assessment",
  description: "Get detailed instructions for your Know Your Resume assessment test. Learn how to complete the test successfully and improve your resume evaluation.",
  keywords: [
    "resume test",
    "assessment instructions",
    "resume evaluation",
    "test guidelines",
    "Know Your Resume"
  ]
}

export default function Page() {
  return (
    <div>
      <ProtectedRoute>
        <Instruction />
      </ProtectedRoute>
    </div>
  )
}