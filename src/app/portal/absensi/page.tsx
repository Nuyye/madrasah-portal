"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle, CalendarDays, Printer } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api";

const initialStudents = [
  { id: "1", nis: "1011", name: "ABDUL RAJIT NUSI", s: 0, i: 0, a: 6, bolos: 0 },
  { id: "2", nis: "1012", name: "AHMAD CHARLY SALAM", s: 1, i: 0, a: 7, bolos: 0 },
  { id: "3", nis: "1013", name: "AHMAD SYAHRUL WAHIDI", s: 0, i: 4, a: 5, bolos: 0 },
  { id: "4", nis: "1014", name: "AL FAZRIN SETIAWAN", s: 0, i: 4, a: 6, bolos: 0 },
  { id: "5", nis: "1015", name: "ALIF SUPU", s: 0, i: 0, a: 10, bolos: 0 },
];

const listBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const listMinggu = ["Minggu Ke-1", "Minggu Ke-2", "Minggu Ke-3", "Minggu Ke-4", "Minggu Ke-5"];

export default function RekapAbsensiPage() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedBulan, setSelectedBulan] = useState("Februari");
  const [selectedMinggu, setSelectedMinggu] = useState("Minggu Ke-1");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(true), 0);
    const dataTimer = setTimeout(() => {
      setStudents(initialStudents);
      setIsLoading(false);
    }, 600);
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(dataTimer);
    };
  }, [selectedBulan, selectedMinggu]);

  const hitungKonversiBolos = (jumlahBolos: number) => {
    if (!jumlahBolos || jumlahBolos <= 0) return 0;
    let konversi = Math.floor(jumlahBolos / 3);
    const sisa = jumlahBolos % 3;
    if (sisa === 2) konversi += 1; 
    return konversi;
  };

  const handleInputChange = (id: string, field: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) return;
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: numValue } : student
      )
    );
  };

  const handleSimpan = async () => {
    const payload = {
      periode: { bulan: selectedBulan, minggu: selectedMinggu },
      data_rekap: students.map((student) => {
        const konversiBolos = hitungKonversiBolos(student.bolos);
        return {
          nis: student.nis,
          nama: student.name,
          sakit: student.s,
          izin: student.i,
          alpha_awal: student.a,
          bolos: student.bolos,
          total_alpha_akhir: student.a + konversiBolos,
        };
      })
    };
    try {
      await MadrasahAPI.submitRekapAbsensi(payload as Record<string, unknown>);
      alert(`Data absensi ${selectedBulan} - ${selectedMinggu} berhasil disimpan!`);
    } catch (error) {
      console.error(error);
      alert("Waduh, koneksi ke server gagal bro!");
    }
  };

  const handleCetak = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 print:space-y-0 print:m-0 print:p-0">
      
      {/* 🚀 MAGIC CSS: Khusus buat nge-print biar persis PDF lama lo */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          aside, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
          @page { size: A4 portrait; margin: 15mm; }
          
          /* Maksa Font Serif (Times New Roman) di kertas print */
          .print-area { font-family: "Times New Roman", Times, serif !important; color: black !important; }
          
          /* Styling Tabel Khas Laporan Resmi */
          .print-table { width: 100% !important; border-collapse: collapse !important; }
          .print-table th, .print-table td { border: 1px solid black !important; padding: 4px 8px !important; color: black !important; font-size: 12px !important; }
          .print-table th { font-weight: bold !important; text-align: center !important; }
          
          /* Ngilangin input box jadi teks biasa pas di-print */
          .print-input { border: none !important; background: transparent !important; text-align: center !important; width: 100% !important; pointer-events: none !important; -moz-appearance: textfield; }
          .print-input::-webkit-outer-spin-button, .print-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        }
      `}} />

      {/* Header Interaktif (Sembunyi pas print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Input Absensi Mingguan</h1>
          <p className="text-slate-500 font-medium mt-1">Pilih periode bulan dan minggu untuk mengisi rekap kehadiran.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleCetak} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
            <Printer className="h-5 w-5" /> Cetak Laporan
          </button>
          <button onClick={handleSimpan} className="flex items-center gap-2 bg-[#115e3b] hover:bg-[#0d4a2e] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm">
            <Save className="h-5 w-5" /> Simpan Data
          </button>
        </div>
      </div>

      {/* FILTER PERIODE (Sembunyi pas print) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 print:hidden">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <CalendarDays className="h-5 w-5 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">Periode:</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <select value={selectedBulan} onChange={(e) => setSelectedBulan(e.target.value)} className="w-full sm:w-48 p-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none cursor-pointer bg-slate-50">
            {listBulan.map(bln => <option key={bln} value={bln}>{bln}</option>)}
          </select>
          <select value={selectedMinggu} onChange={(e) => setSelectedMinggu(e.target.value)} className="w-full sm:w-48 p-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none cursor-pointer bg-slate-50">
            {listMinggu.map(mgg => <option key={mgg} value={mgg}>{mgg}</option>)}
          </select>
        </div>
      </div>

      {/* 📜 AREA PRINT (Kop Surat & Tabel) */}
      <div className="print-area bg-white rounded-2xl shadow-sm border border-slate-100 p-0 sm:p-2 print:border-none print:shadow-none print:p-0 relative overflow-hidden print:overflow-visible">
        
        {/* === KOP SURAT (Hanya tampil saat Print) === */}
        <div className="hidden print:block w-full">
          {/* Header Kop */}
          <div className="flex items-center justify-between pb-2 relative">
            
            {/* Tempat Logo (Lo bisa masukin gambar logo sekolah lo ke folder public/logo.png nanti) */}
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center border border-black rounded-full overflow-hidden">
                {/* <img src="/logo.png" className="w-full h-full object-cover" /> */}
                <span className="text-[10px] text-center font-bold">LOGO<br/>SEKOLAH</span>
            </div>
            
            <div className="text-center flex-1 px-4 leading-snug">
              <h1 className="text-[18px] font-bold uppercase">Madrasah Tsanawiyah &quot;Salafiyah Syafi&apos;iyah&quot;</h1>
              <p className="text-[12px] font-bold uppercase">Desa Banuroja Kecamatan Randangan</p>
              <p className="text-[12px] font-bold uppercase">Kabupaten Pohuwato Prov. Gorontalo</p>
              <p className="text-[12px] mt-1">NSM: 121275040001</p>
            </div>
            
            <div className="w-24 h-24 flex-shrink-0"></div> {/* Spacer kanan biar tengahnya simetris */}
          </div>
          
          {/* Garis Ganda Kop Surat */}
          <div className="border-t-[3px] border-black mt-2"></div>
          <div className="border-t-[1px] border-black mt-[2px] mb-6 w-full"></div>

          {/* Judul Laporan */}
          <div className="text-center mb-6">
            <h2 className="text-[14px] font-bold underline uppercase">Laporan Rekapitulasi Absensi Siswa</h2>
          </div>

          {/* Meta Info Tabel */}
          <div className="flex justify-between text-[12px] font-bold mb-2">
            <div>Kelas: VII C</div> {/* Default Kelas sesuai gambar lo */}
            <div>Bulan: {selectedBulan} | TP: 2026/2027</div>
          </div>
        </div>
        {/* === END KOP SURAT === */}

        {/* Tabel Data */}
        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full text-left print-table">
            <thead>
              <tr className="bg-slate-50 print:bg-white border-b border-slate-200">
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase print:w-10 text-center">No</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase">Nama Siswa</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center print:w-10">S</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center print:w-10">I</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center print:w-10">A</th>
                <th className="p-4 print:p-0 font-bold text-sm text-slate-700 uppercase text-center bg-amber-50/50 print:bg-white print:w-12">Bolos</th>
                <th className="p-4 print:p-0 font-bold text-sm text-[#115e3b] uppercase text-center bg-emerald-50/50 print:bg-white print:w-16">Total A</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-none">
              {students.map((student, index) => {
                const konversiBolos = hitungKonversiBolos(student.bolos);
                const totalAlpha = student.a + konversiBolos;

                // Fungsi ganti angka 0 jadi tanda strip (-) biar persis PDF lo
                const formatNumber = (num: number) => num === 0 ? "-" : num;

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors print:hover:bg-white">
                    <td className="p-4 print:p-0 text-sm font-semibold text-slate-600 text-center print:text-black">{index + 1}</td>
                    <td className="p-4 print:p-0 text-sm font-bold text-slate-800 print:text-black uppercase">{student.name}</td>
                    
                    <td className="p-4 print:p-0 border-l print:border-none border-slate-100">
                      <input type="number" min="0" value={student.s === 0 ? "" : student.s} onChange={(e) => handleInputChange(student.id, "s", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg outline-none print-input print:hidden" placeholder="0" />
                      <span className="hidden print:block text-center">{formatNumber(student.s)}</span>
                    </td>
                    <td className="p-4 print:p-0">
                      <input type="number" min="0" value={student.i === 0 ? "" : student.i} onChange={(e) => handleInputChange(student.id, "i", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg outline-none print-input print:hidden" placeholder="0" />
                      <span className="hidden print:block text-center">{formatNumber(student.i)}</span>
                    </td>
                    <td className="p-4 print:p-0">
                      <input type="number" min="0" value={student.a === 0 ? "" : student.a} onChange={(e) => handleInputChange(student.id, "a", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg outline-none print-input print:hidden" placeholder="0" />
                      <span className="hidden print:block text-center">{formatNumber(student.a)}</span>
                    </td>
                    
                    <td className="p-4 print:p-0 bg-amber-50/20 print:bg-transparent">
                      <input type="number" min="0" value={student.bolos === 0 ? "" : student.bolos} onChange={(e) => handleInputChange(student.id, "bolos", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-amber-300 rounded-lg outline-none bg-white print-input print:hidden" placeholder="0" />
                      <span className="hidden print:block text-center">{formatNumber(student.bolos)}</span>
                    </td>
                    
                    <td className="p-4 print:p-0 bg-emerald-50/20 print:bg-transparent text-center font-bold">
                      <span className="text-lg font-extrabold text-[#115e3b] print:text-black print:text-[12px] print:font-bold">{formatNumber(totalAlpha)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Catatan Bawah - Sembunyi pas Print */}
        <div className="bg-slate-50 p-5 border-t border-slate-200 flex items-start gap-3 print:hidden">
          <AlertCircle className="h-5 w-5 text-[#115e3b] mt-0.5" />
          <div className="text-sm text-slate-700">
            <p className="font-bold">Catatan Sistem Konversi Otomatis:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Bolos 3 kali = 1 Alpha.</li>
              <li>Bolos 2 kali = 1 Alpha.</li>
              <li>Bolos 1 kali = Tidak dihitung.</li>
            </ul>
          </div>
        </div>

        {/* === AREA TANDA TANGAN (Hanya tampil saat print) === */}
        <div className="hidden print:flex justify-end mt-12 w-full pr-8">
          <div className="text-center font-serif text-[12px]">
            <p className="mb-20">Randangan, 28 {selectedBulan} 2026<br/>Wali Kelas VII C</p>
            <p className="font-bold underline uppercase">Ibnu Athoillah</p>
            <p>NIP. 19900101 202603 1 001</p>
          </div>
        </div>

      </div>
    </div>
  );
}