import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-[#d38800]">404</CardTitle>
          <CardDescription className="text-lg">Personnel non trouvé</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">La matricule demandée n'existe pas dans notre base de données.</p>
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
