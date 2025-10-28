import { prisma } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ matricule: string }> }) {
  try {
    const { matricule } = await params
    const personnel = await prisma.personnel.findUnique({
      where: { matricule },
    })

    if (!personnel) {
      return NextResponse.json({ error: "Personnel not found" }, { status: 404 })
    }

    return NextResponse.json(personnel)
  } catch (error) {
    console.error("Error fetching personnel:", error)
    return NextResponse.json({ error: "Failed to fetch personnel" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ matricule: string }> }) {
  try {
    const { matricule } = await params
    const body = await request.json()

    const personnel = await prisma.personnel.update({
      where: { matricule },
      data: body,
    })

    return NextResponse.json(personnel)
  } catch (error) {
    console.error("Error updating personnel:", error)
    return NextResponse.json({ error: "Failed to update personnel" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ matricule: string }> }) {
  try {
    const { matricule } = await params
    await prisma.personnel.delete({
      where: { matricule },
    })

    return NextResponse.json({ message: "Personnel deleted" })
  } catch (error) {
    console.error("Error deleting personnel:", error)
    return NextResponse.json({ error: "Failed to delete personnel" }, { status: 500 })
  }
}
