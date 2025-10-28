"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"

interface StaffData {
  name: string
  forename: string
  jobTitle: string
  department: string
  idNumber: string
  photo?: string
}

interface StaffIdCardProps {
  staffData: StaffData
}

export function StaffIdCard({ staffData: initialStaffData }: StaffIdCardProps) {
  const [staffData, setStaffData] = useState<StaffData>(initialStaffData)

  const [isEditing, setIsEditing] = useState(false)

  const qrData = JSON.stringify({
    id: staffData.idNumber,
    name: `${staffData.forename} ${staffData.name}`,
    position: staffData.jobTitle,
    department: staffData.department,
    organization: "Madagascar National Parks",
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full max-w-6xl space-y-4 md:space-y-6 px-2 sm:px-4">
      {/* Control Panel */}
      <div className="print:hidden bg-card rounded-lg p-4 md:p-6 shadow-lg border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          {/* <h2 className="text-xl md:text-2xl font-bold text-foreground">Générateur de Carte Professionnelle</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none"
            >
              {isEditing ? "Aperçu" : "Modifier"}
            </Button>
            <Button onClick={handlePrint} variant="default" className="flex-1 sm:flex-none">
              Imprimer
            </Button>
          </div> */}
        </div>

        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="photo">URL de la photo</Label>
              <Input
                id="photo"
                value={staffData.photo || ""}
                onChange={(e) => setStaffData({ ...staffData, photo: e.target.value })}
                placeholder="/professional-headshot.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={staffData.name}
                onChange={(e) => setStaffData({ ...staffData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="forename">Prénom</Label>
              <Input
                id="forename"
                value={staffData.forename}
                onChange={(e) => setStaffData({ ...staffData, forename: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Fonction</Label>
              <Input
                id="jobTitle"
                value={staffData.jobTitle}
                onChange={(e) => setStaffData({ ...staffData, jobTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Direction / Département</Label>
              <Input
                id="department"
                value={staffData.department}
                onChange={(e) => setStaffData({ ...staffData, department: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">Matricule</Label>
              <Input
                id="idNumber"
                value={staffData.idNumber}
                onChange={(e) => setStaffData({ ...staffData, idNumber: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* ID Card - Front */}
      <Card className="relative overflow-hidden bg-white shadow-2xl w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d38800] via-[#f0b600] to-[#d38800] opacity-5" />

        <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col min-h-[400px] sm:min-h-[500px]">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 md:mb-6 gap-2">
            <div className="flex-1">
              <h1 className="text-sm sm:text-base md:text-xl font-bold text-[#d38800] mb-1 tracking-wide">
                FICHE INDIVIDUELLE
              </h1>
              <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#d38800] to-[#f0b600]" />
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
              {/* <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO_MNP-gy6tGeLCElRLjnlxQVAXnTQahDuceM.jpg"
                alt="Madagascar National Parks Logo"
                fill
                className="object-contain"
              /> */}
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
            {/* Left Side - Photo */}
            {staffData.photo && (
              <div className="flex-shrink-0">
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-40 rounded-lg overflow-hidden border-3 border-[#d38800] shadow-lg">
                  <Image
                    src={staffData.photo || "/placeholder.svg"}
                    alt={`Photo de ${staffData.forename} ${staffData.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Center - Staff Info */}
            <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">Nom</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-foreground">{staffData.name}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">Prénom</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-foreground">{staffData.forename}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">Fonction</p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground">{staffData.jobTitle}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Direction / Département
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground">{staffData.department}</p>
              </div>
              <div className="pt-2">
                <div className="inline-block bg-gradient-to-r from-[#d38800] to-[#f0b600] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider">{staffData.idNumber}</p>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="flex-shrink-0 flex items-start justify-center sm:justify-end">
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-lg border-3 border-[#d38800]">
                <QRCodeSVG value={qrData} size={100} className="sm:hidden" level="H" />
                <QRCodeSVG value={qrData} size={110} className="hidden sm:block md:hidden" level="H" />
                <QRCodeSVG value={qrData} size={120} className="hidden md:block" level="H" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-[#d38800] pt-3 md:pt-4 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div className="text-[10px] sm:text-xs text-foreground space-y-0.5 sm:space-y-1">
                <p className="font-semibold">Lot AI 10 C Ambatobe ; BP:1424</p>
                <p className="font-semibold">Antananarivo 103 Madagascar</p>
                <p className="font-semibold">(+261) 38 09 400 55</p>
                <p className="text-[#d38800] font-bold">contact@mnparks.mg</p>
                <p className="text-[#d38800] font-bold">www.parcs-madagascar.com</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xl sm:text-2xl font-bold text-[#d38800] italic tracking-wide">For Life</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: 85.6mm 53.98mm;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}
