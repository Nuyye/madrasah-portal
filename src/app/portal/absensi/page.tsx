"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle, CalendarDays, Filter } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api"; // Path import udah aman ya!

const initialStudents = [
  { id: "1", nis: "1011", name: "Ahmad Fauzi", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "2", nis: "1012", name: "Budi Santoso", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "3", nis: "1013", name: "Citra Lestari", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "4", nis: "1014", name: "Dewi Anggraini", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "5", nis: "1015", name: "Eko Prasetyo", s: 0, i: 0, a: 0, bolos: 0 },
];

const listBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const listMinggu = ["Minggu Ke-1", "Minggu Ke-2", "Minggu Ke-3", "Minggu Ke-4", "Minggu Ke-5"];

export default function RekapAbsensiPage() {
  const [students, setStudents] = useState(initialStudents);
  
  // State untuk Filter Periode
  const [selectedBulan, setSelectedBulan] = useState("Februari"); // Default sesuai screenshot lo
  const [selectedMinggu, setSelectedMinggu] = useState("Minggu Ke-1");
  const [isLoading, setIsLoading] = useState(false);

  // Efek transisi saat ganti minggu/bulan (Simulasi ngambil data dari server)
  // Efek transisi saat ganti minggu/bulan
  useEffect(() => {
    // Trik mindahin state ke antrean berikutnya biar linter nggak ngomel
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

  // Algoritma Konversi Bolos
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
    // Payload makin pro: sekarang ada info bulan & minggu-nya!
    const payload = {
      periode: {
        bulan: selectedBulan,
        minggu: selectedMinggu
      },
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
      // Kita kirim data yang udah diracik rapi ke API
      await MadrasahAPI.submitRekapAbsensi(payload as Record<string, unknown>);
      console.log("Data yang dikirim ke server:", payload); // Buat diintip di console F12
      alert(`Data absensi ${selectedBulan} - ${selectedMinggu} berhasil disimpan!`);
    } catch (error) {
      console.error(error);
      alert("Waduh, koneksi ke server gagal bro!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Formal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Input Absensi Mingguan</h1>
          <p className="text-slate-500 font-medium mt-1">Pilih periode bulan dan minggu untuk mengisi rekap kehadiran.</p>
        </div>
        <button
          onClick={handleSimpan}
          className="flex items-center gap-2 bg-[#115e3b] hover:bg-[#0d4a2e] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm"
        >
          <Save className="h-5 w-5" />
          Simpan Data
        </button>
      </div>

      {/* FILTER PERIODE (Bulan & Minggu) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <CalendarDays className="h-5 w-5 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">Periode:</span>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <select 
            value={selectedBulan}
            onChange={(e) => setSelectedBulan(e.target.value)}
            className="w-full sm:w-48 p-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#115e3b] outline-none cursor-pointer bg-slate-50"
          >
            {listBulan.map(bln => <option key={bln} value={bln}>{bln}</option>)}
          </select>

          <select 
            value={selectedMinggu}
            onChange={(e) => setSelectedMinggu(e.target.value)}
            className="w-full sm:w-48 p-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#115e3b] outline-none cursor-pointer bg-slate-50"
          >
            {listMinggu.map(mgg => <option key={mgg} value={mgg}>{mgg}</option>)}
          </select>
        </div>
      </div>

      {/* Tabel Input Terstruktur */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        {/* Efek Loading saat ganti minggu */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#115e3b]"></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider">NIS</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider">Nama Peserta Didik</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider text-center">Sakit (S)</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider text-center">Izin (I)</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider text-center">Alpha (A)</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider text-center border-l border-slate-200 bg-amber-50/50">Indisipliner (Bolos)</th>
                <th className="p-4 font-bold text-sm text-[#115e3b] uppercase tracking-wider text-center bg-emerald-50/50">Total Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const konversiBolos = hitungKonversiBolos(student.bolos);
                const totalAlpha = student.a + konversiBolos;

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-semibold text-slate-600">{student.nis}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{student.name}</td>
                    
                    <td className="p-4"><input type="number" min="0" value={student.s === 0 ? "" : student.s} onChange={(e) => handleInputChange(student.id, "s", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    <td className="p-4"><input type="number" min="0" value={student.i === 0 ? "" : student.i} onChange={(e) => handleInputChange(student.id, "i", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    <td className="p-4"><input type="number" min="0" value={student.a === 0 ? "" : student.a} onChange={(e) => handleInputChange(student.id, "a", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    
                    <td className="p-4 border-l border-slate-200 bg-amber-50/20"><input type="number" min="0" value={student.bolos === 0 ? "" : student.bolos} onChange={(e) => handleInputChange(student.id, "bolos", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white" placeholder="0" /></td>
                    
                    <td className="p-4 bg-emerald-50/20">
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-lg font-extrabold text-[#115e3b]">{totalAlpha}</span>
                        {konversiBolos > 0 && (
                          <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-200">
                            +{konversiBolos}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-50 p-5 border-t border-slate-200 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[#115e3b] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700">
            <p className="font-bold text-slate-800 mb-1">Catatan Sistem Konversi Otomatis:</p>
            <ul className="list-disc pl-4 space-y-1 font-medium text-slate-600">
              <li>Tindak indisipliner (Bolos) sebanyak <strong>3 kali</strong> akan dikonversi menjadi <strong>1 Alpha</strong>.</li>
              <li>Tindak indisipliner (Bolos) sebanyak <strong>2 kali</strong> akan dihitung sebagai <strong>1 Alpha</strong>.</li>
              <li>Tindak indisipliner (Bolos) sebanyak <strong>1 kali</strong> tidak akan dihitung ke dalam kalkulasi akhir.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}