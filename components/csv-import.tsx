"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Upload } from "lucide-react"

export function CSVImport() {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        toast.error("Please select a CSV file")
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error("Please select a file")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/personnel/import-csv", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Import failed")
        return
      }

      toast.success(`${data.successCount} personnel imported successfully`)
      if (data.errors.length > 0) {
        toast.info(`${data.errorCount} errors occurred`)
      }
      setFile(null)
    } catch (error) {
      toast.error("An error occurred during import")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer le personnel depuis un fichier CSV</CardTitle>
        <CardDescription>
         Téléversez un fichier CSV contenant les colonnes suivantes : matricule, nom, nomcomplet, posteabr, departement, direction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">Fichier csv</Label>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} disabled={loading} />
            {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
          </div>
          <Button type="submit" disabled={loading || !file} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Importation en cours..." : "Importer le fichier CSV"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
