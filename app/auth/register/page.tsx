import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <AuthForm mode="register" />
    </main>
  )
}
