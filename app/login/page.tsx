import type { Metadata } from "next"
import LoginForm from "./LoginForm"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Login | Know Your Resume",
  description: "Login to your Know Your Resume account",
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  )
}
