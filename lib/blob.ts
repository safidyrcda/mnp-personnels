import { put, del } from "@vercel/blob"

export async function uploadImage(file: File, path: string) {
  try {
    const blob = await put(path, file, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.error("Error uploading to blob:", error)
    throw error
  }
}

export async function deleteImage(url: string) {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting from blob:", error)
    throw error
  }
}
