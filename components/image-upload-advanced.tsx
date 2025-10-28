"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadAdvancedProps {
  matricule: string
  currentImage?: string
  onUploadSuccess?: (url: string) => void
}

export function ImageUploadAdvanced({ matricule, currentImage, onUploadSuccess }: ImageUploadAdvancedProps) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    setFile(selectedFile)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
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

      toast.success("Image uploaded successfully")
      onUploadSuccess?.(data.photoUrl)
      setFile(null)
      setPreview(data.photoUrl)
    } catch (error) {
      toast.error("An error occurred during upload")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Photo</CardTitle>
        <CardDescription>Upload a profile photo for this personnel (Max 5MB)</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview && (
            <div className="relative w-32 h-40 mx-auto">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover rounded-lg" />
              {file && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null)
                    setFile(null)
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              disabled={loading}
              className="hidden"
            />
            <div onClick={() => fileInputRef.current?.click()} className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Drag and drop your image here</p>
                <p className="text-xs text-muted-foreground">or click to select</p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading || !file} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
