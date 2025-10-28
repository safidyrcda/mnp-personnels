import { prisma } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const personnel = await prisma.personnel.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(personnel)
  } catch (error) {
    console.error("Error fetching personnel:", error)
    return NextResponse.json({ error: "Failed to fetch personnel" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { matricule, nom, nomComplet, posteAbr, departement, direction } = body

    if (!matricule || !nom || !nomComplet) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const personnel = await prisma.personnel.create({
      data: {
        matricule,
        nom,
        nomComplet,
        posteAbr,
        departement,
        direction,
      },
    })

    return NextResponse.json(personnel, { status: 201 })
  } catch (error) {
    console.error("Error creating personnel:", error)
    return NextResponse.json({ error: "Failed to create personnel" }, { status: 500 })
  }
}
