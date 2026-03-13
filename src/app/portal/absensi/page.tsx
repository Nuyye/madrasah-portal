"use client";
import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api";

// Data dummy siswa untuk testing UI
const initialStudents = [
  { id: "1", nis: "1011", name: "Ahmad Fauzi", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "2", nis: "1012", name: "Budi Santoso", s: 0, i: 0, a: 0, bolos: 0 },
  { id: "3", nis: "1013", name: "Citra Lestari", s: 0, i: 0, a: 0, bolos: 0 },
];

export default function RekapAbsensiPage() {
  const [students, setStudents] = useState(initialStudents);

  // 🧠 FUNGSI CORE: Algoritma Konversi Bolos ke Alpha
  const hitungKonversiBolos = (jumlahBolos: number) => {
    if (!jumlahBolos || jumlahBolos <= 0) return 0;
    
    let konversi = Math.floor(jumlahBolos / 3);
    const sisa = jumlahBolos % 3;
    
    // Jika sisa 2, langsung dihitung 1 Alpha. Jika 1, diabaikan.
    if (sisa === 2) konversi += 1; 
    
    return konversi;
  };

  // Handler untuk mengupdate nilai saat diketik
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
  // Kita racik dulu datanya biar yang dikirim ke Back-End udah mateng
  const payload = students.map((student) => {
    const konversiBolos = hitungKonversiBolos(student.bolos);
    return {
      nis: student.nis,
      nama: student.name,
      sakit: student.s,
      izin: student.i,
      alpha_awal: student.a,
      bolos: student.bolos,
      total_alpha_akhir: student.a + konversiBolos, // Ini angka matengnya!
    };
  });

  try {
    // Panggil API kita
    await MadrasahAPI.submitRekapAbsensi(payload);
    alert("Data rekapitulasi kehadiran berhasil disimpan ke dalam sistem.");
  } catch (error) {
  console.error(error); // Tampilkan detail error di console browser
  alert("Waduh, koneksi ke server gagal bro!");
}
};

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Formal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Rekapitulasi Kehadiran Peserta Didik</h1>
          <p className="text-slate-500 font-medium mt-1">Formulir pengisian data absensi bulanan dengan sistem konversi otomatis.</p>
        </div>
        <button
          onClick={handleSimpan}
          className="flex items-center gap-2 bg-[#115e3b] hover:bg-[#0d4a2e] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm"
        >
          <Save className="h-5 w-5" />
          Simpan Data
        </button>
      </div>

      {/* Tabel Input Terstruktur */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
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
                    
                    {/* Input S, I, A */}
                    <td className="p-4"><input type="number" min="0" value={student.s === 0 ? "" : student.s} onChange={(e) => handleInputChange(student.id, "s", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    <td className="p-4"><input type="number" min="0" value={student.i === 0 ? "" : student.i} onChange={(e) => handleInputChange(student.id, "i", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    <td className="p-4"><input type="number" min="0" value={student.a === 0 ? "" : student.a} onChange={(e) => handleInputChange(student.id, "a", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#115e3b] outline-none" placeholder="0" /></td>
                    
                    {/* Input Bolos (Warna beda biar UI/UX jelas) */}
                    <td className="p-4 border-l border-slate-200 bg-amber-50/20"><input type="number" min="0" value={student.bolos === 0 ? "" : student.bolos} onChange={(e) => handleInputChange(student.id, "bolos", e.target.value)} className="w-16 mx-auto block text-center p-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white" placeholder="0" /></td>
                    
                    {/* Output Total Alpha Real-time */}
                    <td className="p-4 bg-emerald-50/20">
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-lg font-extrabold text-[#115e3b]">{totalAlpha}</span>
                        {/* Indikator visual kalau ada penambahan dari Bolos */}
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
        
        {/* Keterangan Aturan di Bawah Tabel */}
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