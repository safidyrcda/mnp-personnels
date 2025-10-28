"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CSVImport } from "@/components/csv-import"
import { Users, Upload, LogOut, Settings } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("import")

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#d38800]">Administration</h1>
            {/* <p className="text-muted-foreground">Manage personnel and uploads</p> */}
          </div>
          {/* <Link href="/">
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/admin/personnel">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personnels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gerer les informations des personnels</p>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Importer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Importer des personnels a partir d'un fichier CSV</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">System settings</p>
            </CardContent>
          </Card> */}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">
              <Upload className="mr-2 h-4 w-4" />
              Importer le fichier CSV
            </TabsTrigger>
            <TabsTrigger value="personnel">
              <Users className="mr-2 h-4 w-4" />
              Liste des personnels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            <CSVImport />
          </TabsContent>

          <TabsContent value="personnel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des informations des personnels</CardTitle>
                <CardDescription>Afficher et gérer le personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/personnel">
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Accéder à la gestion du personnel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
