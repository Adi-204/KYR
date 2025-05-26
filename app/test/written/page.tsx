// test/mcq/page.tsx
import type { Metadata } from "next"
import ProtectedRoute from "@/components/ProtectedRoute"
import { getUserResume } from "@/app/utils/resume"
import { getAuthenticatedUser } from "@/app/utils/auth"
import WrittenTest from "./WrittenTest"
import ProctoredCamera from "@/components/ProtectCamera"

export const metadata: Metadata = {
  title: "Written Test | Know Your Resume - Assessment",
  description: "Take your resume assessment test with written questions.",
}

const Page = async () => {
  const user = await getAuthenticatedUser(); 
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is undefined. Cannot fetch resume.");
  }
  const resumeUrl = await getUserResume(userId);  
  if(!resumeUrl){
    throw new Error("Cannot fetch resume.");
  }
  return (
    <div>
      <ProtectedRoute>
        <ProctoredCamera />
        <WrittenTest resumeUrl={resumeUrl} />
      </ProtectedRoute>
    </div>
  )
}

export default Page;