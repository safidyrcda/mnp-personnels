"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"

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

export default function PersonnelManagementPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPersonnel()
  }, [])

  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/api/personnel")
      const data = await response.json()
      setPersonnel(data)
    } catch (error) {
      toast.error("Failed to fetch personnel")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (matricule: string) => {
    if (!confirm("Are you sure you want to delete this personnel?")) return

    try {
      const response = await fetch(`/api/personnel/${matricule}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        toast.error("Failed to delete personnel")
        return
      }

      toast.success("Personnel deleted successfully")
      setPersonnel(personnel.filter((p) => p.matricule !== matricule))
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const filteredPersonnel = personnel.filter(
    (p) =>
      p.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.posteAbr.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#d38800]">Gestion des informations des personnels</h1>
            <div className="text-muted-foreground">Afficher et gérer les personnels</div>
          </div>
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'administration
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher a partir de: matricule, name, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <Link href="/admin/personnel/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Personnel
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liste des personnels</CardTitle>
            <CardDescription>{filteredPersonnel.length} personnels</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Chargmenent...</p>
            ) : filteredPersonnel.length === 0 ? (
              <p className="text-muted-foreground">Auccun personnel</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matricule</TableHead>
                      <TableHead>Nom Complet</TableHead>
                      <TableHead>Poste</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Direction</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPersonnel.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.matricule}</TableCell>
                        <TableCell>{p.nomComplet}</TableCell>
                        <TableCell>{p.posteAbr}</TableCell>
                        <TableCell>{p.departement}</TableCell>
                        <TableCell>{p.direction}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link href={`/admin/personnel/${p.matricule}`}>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            {/* <Button size="sm" variant="destructive" onClick={() => handleDelete(p.matricule)}>
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
