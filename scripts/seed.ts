import { prisma } from "@/lib/db"

async function main() {
  console.log("Seeding database...")

  // Create sample personnel
  const personnel = [
    {
      matricule: "10400",
      nom: "Nirina",
      nomComplet: "Nirina Jean",
      posteAbr: "REGOI",
      departement: "Département SYSTEME D'INFORMATION",
      direction: "Direction Générale",
    },
    {
      matricule: "10401",
      nom: "RASOAMALALA",
      nomComplet: "RASOAMALALA Marie",
      posteAbr: "Responsable Communication",
      departement: "Direction Générale",
      direction: "Direction Générale",
    },
    {
      matricule: "10402",
      nom: "ANDRIAMANANTSOA",
      nomComplet: "ANDRIAMANANTSOA Paul",
      posteAbr: "Biologiste",
      departement: "Département Recherche",
      direction: "Direction Scientifique",
    },
    {
      matricule: "10403",
      nom: "RAZAFINDRAKOTO",
      nomComplet: "RAZAFINDRAKOTO Sophie",
      posteAbr: "Guide touristique",
      departement: "Département Tourisme",
      direction: "Direction Tourisme",
    },
    {
      matricule: "10404",
      nom: "RANDRIANARISOA",
      nomComplet: "RANDRIANARISOA Michel",
      posteAbr: "Chef de parc",
      departement: "Parc National Andasibe",
      direction: "Direction Opérationnelle",
    },
    {
      matricule: "10405",
      nom: "RAHARISON",
      nomComplet: "RAHARISON Nathalie",
      posteAbr: "Comptable",
      departement: "Département Finances",
      direction: "Direction Administrative",
    },
  ]

  for (const p of personnel) {
    await prisma.personnel.upsert({
      where: { matricule: p.matricule },
      update: p,
      create: p,
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
