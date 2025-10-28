"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"

interface Personnel {
  id: string
  matricule: string
  nom: string
  nomComplet: string
  posteAbr: string
  departement: string
  direction: string
  photoUrl?: string
}

export default function EditPersonnelPage() {
  const router = useRouter()
  const params = useParams()
  const matricule = params.matricule as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [personnel, setPersonnel] = useState<Personnel | null>(null)
  const [formData, setFormData] = useState<Partial<Personnel>>({})

  useEffect(() => {
    if (matricule) {
      fetchPersonnel()
    }
  }, [matricule])

  const fetchPersonnel = async () => {
    try {
      const response = await fetch(`/api/personnel/${matricule}`)
      if (!response.ok) {
        toast.error("Personnel not found")
        router.push("/admin/personnel")
        return
      }
      const data = await response.json()
      setPersonnel(data)
      setFormData(data)
    } catch (error) {
      toast.error("Failed to fetch personnel")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/personnel/${matricule}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        toast.error("Échec de la mise à jour du personnel")
        return
      }

      toast.success("Personnel mis à jour avec succès")
      router.push("/admin/personnel")
    } catch (error) {
      toast.error("Une erreur est survenue")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </main>
    )
  }

  if (!personnel) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Personnel non trouvé</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#d38800]">Modifier les informations du personnel</h1>
            <p className="text-muted-foreground">{personnel.nomComplet}</p>
          </div>
          <Link href="/admin/personnel">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations sur le personnel</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="matricule">Matricule</Label>
                    <Input id="matricule" name="matricule" value={formData.matricule || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" name="nom" value={formData.nom || ""} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomComplet">Nom Complet</Label>
                    <Input
                      id="nomComplet"
                      name="nomComplet"
                      value={formData.nomComplet || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="posteAbr">Poste</Label>
                    <Input
                      id="posteAbr"
                      name="posteAbr"
                      value={formData.posteAbr || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departement">Département</Label>
                    <Input
                      id="departement"
                      name="departement"
                      value={formData.departement || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direction">Direction</Label>
                    <Input
                      id="direction"
                      name="direction"
                      value={formData.direction || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={saving} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <ImageUpload
              matricule={matricule}
              currentImage={personnel.photoUrl}
              onUploadSuccess={(url) => {
                setPersonnel({ ...personnel, photoUrl: url })
                setFormData({ ...formData, photoUrl: url })
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
