import { put, del, list } from "@vercel/blob"

export interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
}

export async function uploadPersonnelPhoto(file: File, matricule: string): Promise<string> {
  try {
    const timestamp = Date.now()
    const filename = `${matricule}-${timestamp}-${file.name}`
    const pathname = `personnel/${matricule}/${filename}`

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return blob.url
  } catch (error) {
    console.error("Error uploading photo:", error)
    throw new Error("Failed to upload photo")
  }
}

export async function deletePersonnelPhoto(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting photo:", error)
    throw new Error("Failed to delete photo")
  }
}

export async function listPersonnelPhotos(matricule: string): Promise<BlobFile[]> {
  try {
    const { blobs } = await list({
      prefix: `personnel/${matricule}/`,
    })

    return blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }))
  } catch (error) {
    console.error("Error listing photos:", error)
    return []
  }
}
