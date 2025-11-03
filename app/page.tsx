'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award as IdCard, LogIn, Settings, Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Home() {

    const router = useRouter()

  const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      matricule: "",
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
        
        router.push(`/details/${formData.matricule}`)
      } catch (error) {
        toast.error("An error occurred")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
  <div className="w-full max-w-4xl space-y-8">
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-[#d38800]">Madagascar National Parks</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
         Cette plateforme permet aux visiteurs de consulter la fiche publique d’un personnel de Madagascar National Parks.
  L’accès se fait en scannant le QR code présent sur le badge de la personne ou en saisissant son numéro matricule ci-dessous.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="matricule">Saisir le numéro matricule</Label>
              <Input id="matricule" name="matricule" value={formData.matricule} onChange={handleChange} required />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Recherche..." : "Rechercher le personnel"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  </div>
</main>

  )
}
