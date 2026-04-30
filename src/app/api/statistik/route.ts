import { NextResponse } from "next/server";
// 👇 KITA PANGGIL PRISMA DARI FOLDER LIB, BUKAN BIKIN BARU!
import { prisma } from "@/lib/prisma"; 

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rekapAbsensi = await prisma.absensi.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    let totalSakit = 0;
    let totalIzin = 0;
    let totalAlpha = 0;

    rekapAbsensi.forEach((item) => {
      if (item.status === 'SAKIT') totalSakit = item._count.status;
      if (item.status === 'IZIN') totalIzin = item._count.status;
      if (item.status === 'ALPHA') totalAlpha = item._count.status;
    });

    const dataGrafik = [
      { name: 'Sakit', total: totalSakit },
      { name: 'Izin', total: totalIzin },
      { name: 'Alpha', total: totalAlpha },
    ];

    return NextResponse.json(dataGrafik);
    
  } catch (error) {
    console.error("Gagal ngambil data statistik:", error);
    return NextResponse.json(
      { error: "Aduh bro, gagal narik data dari database nih!" },
      { status: 500 }
    );
  }
}