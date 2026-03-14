"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Printer, Search, ShieldAlert } from "lucide-react";
// Pastikan import Image bener ya bro, tanpa kata 'public'
import Image from "next/image"; 

// Data Dummy Simulasi Server (Ada yang Alpha-nya 3+, ada yang aman)
const dataSiswa = [
  { id: "1", nis: "1011", name: "ABDUL RAJIT NUSI", className: "VII C", a: 4, bolos: 0 }, // Kena (Alpha 4)
  { id: "2", nis: "1012", name: "AHMAD CHARLY SALAM", className: "VII C", a: 2, bolos: 3 }, // Kena (Alpha 2 + Bolos 3 = Total 3)
  { id: "3", nis: "1015", name: "ALIF SUPU", className: "VII C", a: 1, bolos: 1 }, // Aman (Total 1)
  { id: "4", nis: "2011", name: "BIMA SAKTI", className: "VIII A", a: 5, bolos: 0 }, // Kena (Alpha 5)
  { id: "5", nis: "3012", name: "CITRA KIRANA", className: "IX B", a: 0, bolos: 6 }, // Aman (Bolos 6 = Alpha 2)
];

export default function PembinaanPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Logic Early Warning: Filter cuma anak yang Total Alpha >= 3
  const siswaBermasalah = useMemo(() => {
    return dataSiswa
      .map(siswa => {
        // Rumus konversi yang sama kayak di absen
        let konversiBolos = Math.floor(siswa.bolos / 3);
        const sisa = siswa.bolos % 3;
        if (sisa === 2) konversiBolos += 1;
        
        const totalAlpha = siswa.a + konversiBolos;
        return { ...siswa, totalAlpha };
      })
      .filter(siswa => siswa.totalAlpha >= 3) // 🔥 INI INTI FILternya: Cuma nangkep yang >= 3
      .filter(siswa => 
        siswa.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        siswa.className.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery]);

  const handleCetak = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 print:space-y-0 print:m-0 print:p-0">
      
      {/* 🚀 MAGIC CSS KHUSUS PRINT */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          aside, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
          @page { size: A4 portrait; margin: 15mm; }
          .print-area { font-family: "Times New Roman", Times, serif !important; color: black !important; }
          .print-table { width: 100% !important; border-collapse: collapse !important; }
          .print-table th, .print-table td { border: 1px solid black !important; padding: 6px 8px !important; color: black !important; font-size: 12px !important; }
          .print-table th { font-weight: bold !important; text-align: center !important; }
        }
      `}} />

      {/* Header Interaktif */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Data Pembinaan Siswa</h1>
            <p className="text-slate-500 font-medium mt-1">Daftar siswa dengan peringatan jumlah Alpha $\ge$ 3.</p>
          </div>
        </div>
        
        <button onClick={handleCetak} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
          <Printer className="h-5 w-5" /> Cetak Laporan
        </button>
      </div>

      {/* Toolbar Pencarian */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 print:hidden">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama atau kelas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
      </div>

      {/* 📜 AREA PRINT & TABEL */}
      <div className="print-area bg-white rounded-2xl shadow-sm border border-slate-100 p-0 sm:p-2 print:border-none print:shadow-none print:p-0">
        
        {/* === KOP SURAT (Hanya tampil saat Print) === */}
        <div className="hidden print:block w-full">
          <div className="flex items-center justify-between pb-2 relative">
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center border border-black rounded-full overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="/assets/logo1.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="text-center flex-1 px-4 leading-snug">
              <h1 className="text-[18px] font-bold uppercase">Madrasah Tsanawiyah &quot;Salafiyah Syafi&apos;iyah&quot;</h1>
              <p className="text-[12px] font-bold uppercase">Desa Banuroja Kecamatan Randangan</p>
              <p className="text-[12px] font-bold uppercase">Kabupaten Pohuwato Prov. Gorontalo</p>
              <p className="text-[12px] mt-1">NSM: 121275040001</p>
            </div>
            <div className="w-24 h-24 flex-shrink-0"></div> 
          </div>
          
          <div className="border-t-[3px] border-black mt-2"></div>
          <div className="border-t-[1px] border-black mt-[2px] mb-6 w-full"></div>

          <div className="text-center mb-6">
            <h2 className="text-[14px] font-bold underline uppercase">Laporan Siswa Dalam Pengawasan (Pembinaan)</h2>
            <p className="text-[12px] mt-1">Kriteria: Akumulasi Alpha $\ge$ 3</p>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto print:overflow-visible p-4 print:p-0">
          <table className="w-full text-left print-table">
            <thead>
              <tr className="bg-slate-50 print:bg-white border-b border-slate-200">
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase print:w-10 text-center">No</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase">NIS</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase">Nama Siswa</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center">Kelas</th>
                <th className="p-4 print:p-0 font-bold text-sm text-red-600 uppercase text-center">Total Alpha</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center print:w-32">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-none">
              {siswaBermasalah.length > 0 ? (
                siswaBermasalah.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors print:hover:bg-white">
                    <td className="p-4 print:p-0 text-sm font-semibold text-slate-600 text-center print:text-black">{index + 1}</td>
                    <td className="p-4 print:p-0 text-sm font-semibold text-slate-600 print:text-black">{student.nis}</td>
                    <td className="p-4 print:p-0 text-sm font-bold text-slate-800 print:text-black uppercase">{student.name}</td>
                    <td className="p-4 print:p-0 text-sm font-semibold text-slate-600 text-center print:text-black">{student.className}</td>
                    <td className="p-4 print:p-0 text-center">
                      <span className="inline-flex items-center justify-center bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full print:bg-transparent print:text-black print:p-0">
                        {student.totalAlpha}
                      </span>
                    </td>
                    <td className="p-4 print:p-0 text-center">
                      <span className="text-xs font-bold text-slate-500 uppercase print:text-black">
                        Panggil Orang Tua
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium print:text-black">
                    Alhamdulillah, belum ada siswa yang melampaui batas Alpha.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* AREA TANDA TANGAN (Hanya tampil saat print) */}
        <div className="hidden print:flex justify-between mt-12 w-full px-8">
           <div className="text-center font-serif text-[12px]">
            <p className="mb-20">Mengetahui,<br/>Kepala Madrasah</p>
            <p className="font-bold underline uppercase">( ................................... )</p>
            <p>NIP. </p>
          </div>
          <div className="text-center font-serif text-[12px]">
            <p className="mb-20">Randangan, ..................... 2026<br/>Guru Bimbingan Konseling / TU</p>
            <p className="font-bold underline uppercase">Ibnu Athoillah</p>
            <p>NIP. 19900101 202603 1 001</p>
          </div>
        </div>

      </div>
    </div>
  );
}