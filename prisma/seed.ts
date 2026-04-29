import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Mulai menanam data siswa dan absensi...')

  // 1. Bersihin data lama biar nggak dobel
  await prisma.absensi.deleteMany()
  await prisma.siswa.deleteMany()

  // 2. Bikin Data Siswa (Sesuai Screenshot)
  const rajit = await prisma.siswa.create({
    data: { nisn: '111', nama: 'ABDUL RAJIT NUSI', kelas: 'VII-A' }
  })
  
  const charly = await prisma.siswa.create({
    data: { nisn: '222', nama: 'AHMAD CHARLY SALAM', kelas: 'VII-A' }
  })
  
  const syahrul = await prisma.siswa.create({
    data: { nisn: '333', nama: 'AHMAD SYAHRUL WAHIDI', kelas: 'VII-A' }
  })

  console.log('✅ Data 3 Siswa berhasil dibuat!')

  // 3. Suntik Data Absensi
  // Rajit: 6 Alpha
  await prisma.absensi.createMany({
    data: Array(6).fill(null).map(() => ({
      siswaId: rajit.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA'
    }))
  })

  // Charly: 1 Sakit, 7 Alpha
  await prisma.absensi.create({
    data: { siswaId: charly.id, mingguKe: 1, bulan: 'Februari', status: 'SAKIT' }
  })
  await prisma.absensi.createMany({
    data: Array(7).fill(null).map(() => ({
      siswaId: charly.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA'
    }))
  })

  // Syahrul: 4 Izin, 5 Alpha
  await prisma.absensi.createMany({
    data: Array(4).fill(null).map(() => ({
      siswaId: syahrul.id, mingguKe: 1, bulan: 'Februari', status: 'IZIN'
    }))
  })
  await prisma.absensi.createMany({
    data: Array(5).fill(null).map(() => ({
      siswaId: syahrul.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA'
    }))
  })

  console.log('✅ Data Absensi sukses disuntikkan ke database!')
}

main()
  .catch((e) => {
    console.error('❌ GAGAL NGASIH MAKAN DATABASE:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })