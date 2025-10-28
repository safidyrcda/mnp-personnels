import { uploadImage } from "@/lib/blob"
import { prisma } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const matricule = formData.get("matricule") as string

    if (!file || !matricule) {
      return NextResponse.json({ error: "Missing file or matricule" }, { status: 400 })
    }

    // Delete old image if exists
    const personnel = await prisma.personnel.findUnique({
      where: { matricule },
    })

    if (personnel?.photoUrl) {
      try {
        await fetch(personnel.photoUrl, { method: "DELETE" })
      } catch (e) {
        console.error("Error deleting old image:", e)
      }
    }

    // Upload new image
    const photoUrl = await uploadImage(file, `personnel/${matricule}/${Date.now()}-${file.name}`)

    // Update personnel record
    const updated = await prisma.personnel.update({
      where: { matricule },
      data: { photoUrl },
    })

    return NextResponse.json({ photoUrl: updated.photoUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
