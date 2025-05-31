import type { Metadata } from "next"
import ProtectedRoute from "@/components/ProtectedRoute"
import Review from "./Review"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Resume AI Review & Score | Instant Feedback for Job Seekers - Know Your Resume",
  description: "Upload your resume for an in-depth AI analysis. Receive detailed feedback, a comprehensive score, and actionable insights to optimize your resume for success.",
};

const Page = async () => {
  return (
    <div>
      <ProtectedRoute>
        <Navbar />
        <Review />
      </ProtectedRoute>
    </div>
  )
}

export default Page;