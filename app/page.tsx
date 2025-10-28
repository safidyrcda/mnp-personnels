import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award as IdCard, LogIn, Settings } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-4xl space-y-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#d38800]">Madagascar National Parks</CardTitle>
            <CardDescription className="text-lg">Système de gestion des cartes professionnelles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/personnel/10400" className="block">
                <Button className="w-full h-24 text-lg" variant="default">
                  <IdCard className="mr-2 h-6 w-6" />
                  Voir une carte
                </Button>
              </Link>
              <Link href="/liste-personnel" className="block">
                <Button className="w-full h-24 text-lg bg-transparent" variant="outline">
                  <Users className="mr-2 h-6 w-6" />
                  Liste du personnel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Authentication
              </CardTitle>
              <CardDescription>Sign in or create an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/auth/login" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Account
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Administration
              </CardTitle>
              <CardDescription>Manage personnel and data</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin" className="block">
                <Button className="w-full">Admin Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
