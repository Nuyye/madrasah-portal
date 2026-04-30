import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// 👇 SENJATA PAMUNGKAS: Panggil tipe resmi dari markas Prisma
import { Prisma } from "@prisma/client"; 

interface StudentData {
  id: string;
  s: number;
  i: number;
  a: number;
  bolos: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bulan = searchParams.get("bulan") || "Februari";
  const mingguStr = searchParams.get("minggu") || "Minggu Ke-1";
  const mingguKe = parseInt(mingguStr.replace(/\D/g, "")) || 1;

  try {
    const semuaSiswa = await prisma.siswa.findMany({ orderBy: { nama: 'asc' } });
    const semuaAbsensi = await prisma.absensi.findMany({ where: { bulan, mingguKe } });

    const dataFrontend = semuaSiswa.map((siswa) => {
      const absenSiswa = semuaAbsensi.filter(a => a.siswaId === siswa.id);
      return {
        id: siswa.id,
        nis: siswa.nisn || "-", 
        name: siswa.nama,
        s: absenSiswa.filter(a => a.status === 'SAKIT').length,
        i: absenSiswa.filter(a => a.status === 'IZIN').length,
        a: absenSiswa.filter(a => a.status === 'ALPHA').length,
        bolos: absenSiswa.filter(a => a.status === 'BOLOS').length,
      };
    });

    return NextResponse.json(dataFrontend);
  } catch (error) {
    console.error("Gagal get data:", error);
    return NextResponse.json({ error: "Gagal narik data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bulan, minggu, data_rekap } = body;
    const mingguKe = parseInt(minggu.replace(/\D/g, "")) || 1;

    await prisma.absensi.deleteMany({
      where: { bulan, mingguKe }
    });

    // 👇 PAKE SERAGAM RESMI PRISMA! Dijamin Satpam TypeScript langsung hormat
    const dataBaru: Prisma.AbsensiCreateManyInput[] = [];
    
    // Looping datanya pake cara yang lebih aman (nggak pake Array.fill)
    data_rekap.forEach((student: StudentData) => {
      for(let x = 0; x < student.s; x++) dataBaru.push({ siswaId: student.id, bulan, mingguKe, status: 'SAKIT' });
      for(let x = 0; x < student.i; x++) dataBaru.push({ siswaId: student.id, bulan, mingguKe, status: 'IZIN' });
      for(let x = 0; x < student.a; x++) dataBaru.push({ siswaId: student.id, bulan, mingguKe, status: 'ALPHA' });
      for(let x = 0; x < student.bolos; x++) dataBaru.push({ siswaId: student.id, bulan, mingguKe, status: 'BOLOS' });
    });

    if (dataBaru.length > 0) {
      await prisma.absensi.createMany({ data: dataBaru });
    }

    return NextResponse.json({ message: "Berhasil disimpan bosku!" });
  } catch (error) {
    console.error("Gagal save data:", error);
    return NextResponse.json({ error: "Gagal simpan data" }, { status: 500 });
  }
}