import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Register | Know Your Resume",
  description: "Register to Know Your Resume",
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <RegisterForm />
    </div>
  )
}
