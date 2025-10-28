import { StaffIdCard } from "@/components/staff-id-card"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{
    matricule: string
  }>
}

export default async function PersonnelPage({ params }: PageProps) {
  const { matricule } = await params

  const personnel = await prisma.personnel.findUnique({
    where: { matricule },
  })

  if (!personnel) {
    notFound()
  }

  // Convert database record to StaffData format
  const staffMember = {
    name: personnel.nom,
    forename: personnel.nomComplet.split(" ").slice(1).join(" ") || personnel.nom,
    jobTitle: personnel.posteAbr,
    department: personnel.departement,
    idNumber: personnel.matricule,
    photo: personnel.photoUrl ?? undefined,
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-background via-muted/30 to-background">
      {/* <div className="w-full max-w-6xl mb-4 print:hidden">
        <Link href="/liste-personnel">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Retour à la liste</span>
            <span className="sm:hidden">Retour</span>
          </Button>
        </Link>
      </div> */}
      <StaffIdCard staffData={staffMember} />
    </main>
  )
}
