"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowRightLeft, Users, CheckSquare } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api";

// Bikin cetakan tipe data biar TypeScript nggak ngomel
interface Student {
  id: string;
  nis: string;
  name: string;
  className: string;
}

// Data dummy awal
const initialData: Student[] = [
  { id: "1", nis: "1011", name: "Ahmad Fauzi", className: "10-IPA-1" },
  { id: "2", nis: "1012", name: "Budi Santoso", className: "10-IPA-1" },
  { id: "3", nis: "1013", name: "Citra Lestari", className: "10-IPA-2" },
  { id: "4", nis: "1014", name: "Dewi Anggraini", className: "10-IPS-1" },
  { id: "5", nis: "1015", name: "Eko Prasetyo", className: "10-IPS-1" },
];

export default function DataSiswaPage() {
  const [students, setStudents] = useState<Student[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("Semua");
  
  // State buat Checkbox & Pindah Kelas
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetClass, setTargetClass] = useState("");
  const [isMoving, setIsMoving] = useState(false);

  // Daftar unik kelas untuk dropdown filter
  const classOptions = ["Semua", "10-IPA-1", "10-IPA-2", "10-IPS-1", "11-IPA-1", "11-IPS-1"];

  // Logika Filter & Search (Otomatis update tabel tanpa tombol cari)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.nis.includes(searchQuery);
      const matchClass = selectedClassFilter === "Semua" || student.className === selectedClassFilter;
      return matchSearch && matchClass;
    });
  }, [students, searchQuery, selectedClassFilter]);

  // Handler Checkbox
  const handleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]); // Uncheck semua
    } else {
      setSelectedIds(filteredStudents.map(s => s.id)); // Check semua yg ada di layar
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Handler Action Pindah Kelas
  const handleBulkMove = async () => {
    if (selectedIds.length === 0) return alert("Pilih minimal 1 siswa dulu bro!");
    if (!targetClass) return alert("Pilih kelas tujuan dulu bro!");
    
    setIsMoving(true);
    try {
      // Panggil API yang udah lo bikin
      await MadrasahAPI.bulkMoveClass(selectedIds, targetClass);
      
      // Update UI Tabel
      setStudents(prev => prev.map(student => 
        selectedIds.includes(student.id) ? { ...student, className: targetClass } : student
      ));
      
      alert(`Berhasil memindahkan ${selectedIds.length} siswa ke kelas ${targetClass}`);
      setSelectedIds([]); // Kosongin centang setelah berhasil
      setTargetClass(""); // Reset dropdown tujuan
    } catch (error) {
      console.error(error);
      alert("Gagal memindahkan siswa. Cek koneksi server!");
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Title */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-100 p-2 rounded-lg text-[#115e3b]">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">Master Data Siswa</h1>
        </div>
        <p className="text-slate-500 font-medium">Kelola database siswa dan mutasi pindah kelas secara massal.</p>
      </div>

      {/* Toolbar: Search, Filter & Action Area */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Kiri: Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari NIS atau Nama..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115e3b] outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select 
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-[#115e3b] outline-none bg-white cursor-pointer"
            >
              {classOptions.map(opt => <option key={opt} value={opt}>Kelas: {opt}</option>)}
            </select>
          </div>
        </div>

        {/* Kanan: Bulk Action Move Class */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <span className="text-sm font-bold text-slate-600 px-2 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" /> {selectedIds.length} Terpilih
          </span>
          <select 
            value={targetClass}
            onChange={(e) => setTargetClass(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
          >
            <option value="">-- Pilih Kelas Tujuan --</option>
            {classOptions.filter(o => o !== "Semua").map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button 
            onClick={handleBulkMove}
            disabled={isMoving || selectedIds.length === 0 || !targetClass}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
          >
            <ArrowRightLeft className="h-4 w-4" /> Mutasi
          </button>
        </div>
      </div>

      {/* Tabel Data Siswa */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#115e3b] focus:ring-[#115e3b] cursor-pointer"
                  />
                </th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider">NIS</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider">Nama Peserta Didik</th>
                <th className="p-4 font-bold text-sm text-slate-700 uppercase tracking-wider">Kelas Saat Ini</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className={selectedIds.includes(student.id) ? "bg-emerald-50/50" : "hover:bg-slate-50 transition-colors"}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(student.id)}
                        onChange={() => handleSelectOne(student.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[#115e3b] focus:ring-[#115e3b] cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-600">{student.nis}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{student.name}</td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                        {student.className}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">
                    Tidak ada data siswa yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}