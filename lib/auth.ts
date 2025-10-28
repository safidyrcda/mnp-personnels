import { hash, compare } from "bcryptjs"
import { prisma } from "./db"

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password)
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return user
}
