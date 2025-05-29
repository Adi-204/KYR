// test/mcq/page.tsx
import type { Metadata } from "next"
import ProtectedRoute from "@/components/ProtectedRoute"
import Results from "./Results"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Assessment Results | Know Your Resume",
  description:
    "View your performance results for both multiple choice and written assessments on Know Your Resume. Analyze your strengths and areas for improvement.",
}

const Page = async () => {
  return (
    <div>
      <ProtectedRoute>
        <Navbar />
        <Results />
      </ProtectedRoute>
    </div>
  )
}

export default Page;