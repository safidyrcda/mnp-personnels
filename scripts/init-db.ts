import { prisma } from "@/lib/db"

async function main() {
  

  console.log("Database initialized successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
