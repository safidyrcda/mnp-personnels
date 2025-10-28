import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { ArrowLeft, Award as IdCard } from "lucide-react"

export default async function ListePersonnelPage() {
  const staff = await prisma.personnel.findMany({
    orderBy: { createdAt: "asc" },
  })

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-6 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#d38800]">Liste du Personnel</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {staff.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">{member.nomComplet}</CardTitle>
                <CardDescription className="text-sm">{member.posteAbr}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{member.departement}</p>
                <p className="text-xs sm:text-sm font-semibold text-[#d38800]">Matricule: {member.matricule}</p>
                <Link href={`/personnel/${member.matricule}`}>
                  <Button className="w-full mt-2" variant="default" size="sm">
                    <IdCard className="mr-2 h-4 w-4" />
                    Voir la carte
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
