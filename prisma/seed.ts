import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Gaming PC',      price: 4999 },
      { name: 'Xbox Series X',  price: 2299 },
      { name: 'ثلاجة سامسونج', price: 2800 },
      { name: 'تلفزيون LG',     price: 3199 },
      { name: 'غسالة سامسونج', price: 2100 },
      { name: 'MacBook Pro M3', price: 4299 },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Products seeded')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
