"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, Plus } from "lucide-react"

export default function NewPersonnelPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    matricule: "",
    nom: "",
    nomComplet: "",
    posteAbr: "",
    departement: "",
    direction: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/personnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        toast.error(data.error || "Failed to create personnel")
        return
      }

      toast.success("Personnel created successfully")
      router.push("/admin/personnel")
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#d38800]">Add New Personnel</h1>
            <p className="text-muted-foreground">Create a new personnel record</p>
          </div>
          <Link href="/admin/personnel">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personnel Information</CardTitle>
            <CardDescription>Fill in all required fields</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matricule">Matricule *</Label>
                <Input id="matricule" name="matricule" value={formData.matricule} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomComplet">Nom Complet *</Label>
                <Input id="nomComplet" name="nomComplet" value={formData.nomComplet} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posteAbr">Poste *</Label>
                <Input id="posteAbr" name="posteAbr" value={formData.posteAbr} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departement">Département *</Label>
                <Input
                  id="departement"
                  name="departement"
                  value={formData.departement}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direction">Direction *</Label>
                <Input id="direction" name="direction" value={formData.direction} onChange={handleChange} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {loading ? "Creating..." : "Create Personnel"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
