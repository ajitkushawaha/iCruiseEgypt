import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as pg from 'pg'
import path from 'path'
import { config } from 'dotenv'

// Explicitly load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const prismaClientSingleton = () => {
  const connectionString = process.env.PostgreSQL || process.env.DATABASE_URL
  
  if (!connectionString) {
    console.error("Database connection string (PostgreSQL or DATABASE_URL) is missing!")
  }

  const pool = new pg.Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    keepAlive: true,
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
