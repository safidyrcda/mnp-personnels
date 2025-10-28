"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  matricule: string
  currentImage?: string
  onUploadSuccess?: (url: string) => void
}

export function ImageUpload({ matricule, currentImage, onUploadSuccess }: ImageUploadProps) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please select an image file")
        return
      }
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error("Please select an image")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("matricule", matricule)

      const response = await fetch("/api/personnel/upload-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Upload failed")
        return
      }

      toast.success("Image téléchargée avec succès")
      onUploadSuccess?.(data.photoUrl)
      setFile(null)
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléchargement de l'image")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importer une photo</CardTitle>
        <CardDescription>Importer la photo de profil de ce personnel</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview && (
            <div className="relative w-32 h-32">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setPreview(null)
                  setFile(null)
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="image-file">Image</Label>
            <Input id="image-file" type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
          </div>
          <Button type="submit" disabled={loading || !file} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Importation..." : "Importer l'image"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
