import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Register | Know Your Resume",
  description: "Register to Know Your Resume",
}

export default function Page() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
