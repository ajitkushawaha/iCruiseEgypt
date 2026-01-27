import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import path from 'path'
import { config } from 'dotenv'

// Explicitly load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const prismaClientSingleton = () => {
  const connectionString = `${process.env.PostgreSQL}`
  
  const pool = new pg.Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
