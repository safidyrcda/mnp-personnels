import { prisma } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const decoder = new TextDecoder("utf-8")
    const text = decoder.decode(arrayBuffer)
    const results = Papa.parse(text, { header: true, skipEmptyLines: true })

    if (results.errors.length > 0) {
      return NextResponse.json({ error: "Invalid CSV format", details: results.errors }, { status: 400 })
    }

    // Nettoyer les entêtes
    const normalizedData = results.data.map((row: any) => {
      const cleanRow: Record<string, string> = {}
      for (const key in row) {
        cleanRow[key.trim()] = row[key]?.trim()
      }
      return cleanRow
    })

    // Exécuter en parallèle
    const operations = normalizedData.map(async (row) => {
      try {
        const { matricule, nom, nomcomplet, posteabr, departement, direction } = row

        console.log("Processing row:", row)

        if (!matricule || !nom) {
          console.warn("Skipping row due to missing required fields:", row)
          throw new Error("Missing required fields (Matricule, Nom, Nom Complet)")
        }

        const res = await prisma.personnel.upsert({
          where: { matricule: matricule },
          update: {
            nom: nom,
            nomComplet: nomcomplet,
            posteAbr: posteabr,
            departement: departement,
            direction: direction,
          },
          create: {
            matricule: matricule,
            nom: nom,
            nomComplet: nomcomplet,
            posteAbr: posteabr,
            departement: departement,
            direction: direction,
          },
        })

        console.log("Upserted personnel:", res.matricule)

        return { status: "success" }
      } catch (err) {
        console.log("Error processing row:", err)
        return { status: "error", message: err instanceof Error ? err.message : "Unknown error" }
      }
    })

    const resultsAll = await Promise.allSettled(operations)
    const isFulfilled = (r: PromiseSettledResult<any>): r is PromiseFulfilledResult<any> =>
      r.status === "fulfilled"

    const successCount = resultsAll
      .filter(isFulfilled)
      .filter(r => r.value.status === "success")
      .length

    const errors = resultsAll
      .filter(isFulfilled)
      .filter(r => r.value.status === "error")
      .map(r => r.value.message as string)
      .slice(0, 10)

    return NextResponse.json({
      successCount,
      errorCount: resultsAll.length - successCount,
      errors,
      message: `Imported ${successCount} personnel records`,
    })
  } catch (error) {
    console.error("Import error:", error)
    return NextResponse.json({ error: "Failed to import CSV" }, { status: 500 })
  }
}
