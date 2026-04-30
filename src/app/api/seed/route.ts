import { NextResponse } from "next/server";
// Kita panggil Pelayan Senior yang udah terbukti jalan!
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  try {
    console.log("Mulai nyuntik data dari jalur dalam...");

    // 1. Bersihin Kulkas
    await prisma.absensi.deleteMany();
    await prisma.siswa.deleteMany();

    // 2. Masukin Data Siswa
    const rajit = await prisma.siswa.create({ data: { nisn: '111', nama: 'ABDUL RAJIT NUSI', kelas: 'VII-A' }});
    const charly = await prisma.siswa.create({ data: { nisn: '222', nama: 'AHMAD CHARLY SALAM', kelas: 'VII-A' }});
    const syahrul = await prisma.siswa.create({ data: { nisn: '333', nama: 'AHMAD SYAHRUL WAHIDI', kelas: 'VII-A' }});

    // 3. Masukin Data Absensi
    // Rajit
    await prisma.absensi.createMany({ data: Array(6).fill(null).map(() => ({ siswaId: rajit.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA' }))});
    
    // Charly
    await prisma.absensi.create({ data: { siswaId: charly.id, mingguKe: 1, bulan: 'Februari', status: 'SAKIT' }});
    await prisma.absensi.createMany({ data: Array(7).fill(null).map(() => ({ siswaId: charly.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA' }))});
    
    // Syahrul
    await prisma.absensi.createMany({ data: Array(4).fill(null).map(() => ({ siswaId: syahrul.id, mingguKe: 1, bulan: 'Februari', status: 'IZIN' }))});
    await prisma.absensi.createMany({ data: Array(5).fill(null).map(() => ({ siswaId: syahrul.id, mingguKe: 1, bulan: 'Februari', status: 'ALPHA' }))});

    return NextResponse.json({ 
      status: "SUKSES BOSKU!", 
      pesan: "✅ Data Dummy Berhasil Disuntikkan Ke Database!" 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal nyuntik", detail: error }, { status: 500 });
  }
}