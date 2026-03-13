"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowRightLeft, Users, CheckSquare, Plus, X } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api";

interface Student {
  id: string;
  nis: string;
  name: string;
  className: string;
}

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
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetClass, setTargetClass] = useState("");
  const [isMoving, setIsMoving] = useState(false);

  // State khusus buat Modal Tambah Siswa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ nis: "", name: "", className: "10-IPA-1" });

  const classOptions = ["Semua", "VII A", "VII B", "VII C", "VII D", "VIII A", "VIII B", "VIII C", "VIII D", "IX A", "IX B", "IX C", "IX D"];
  const inputClassOptions = classOptions.filter(c => c !== "Semua"); // Buat form input nggak ada opsi "Semua"

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.nis.includes(searchQuery);
      const matchClass = selectedClassFilter === "Semua" || student.className === selectedClassFilter;
      return matchSearch && matchClass;
    });
  }, [students, searchQuery, selectedClassFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkMove = async () => {
    if (selectedIds.length === 0) return alert("Pilih minimal 1 siswa dulu bro!");
    if (!targetClass) return alert("Pilih kelas tujuan dulu bro!");
    
    setIsMoving(true);
    try {
      await MadrasahAPI.bulkMoveClass(selectedIds, targetClass);
      setStudents(prev => prev.map(student => 
        selectedIds.includes(student.id) ? { ...student, className: targetClass } : student
      ));
      alert(`Berhasil memindahkan ${selectedIds.length} siswa ke kelas ${targetClass}`);
      setSelectedIds([]);
      setTargetClass("");
    } catch (error) {
      console.error(error);
      alert("Gagal memindahkan siswa. Cek koneksi server!");
    } finally {
      setIsMoving(false);
    }
  };

  // Fungsi Action Tambah Siswa Baru
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault(); // Biar halaman nggak me-refresh
    
    if (!newStudent.nis || !newStudent.name) {
      return alert("NIS dan Nama wajib diisi bro!");
    }

    // Bikin ID unik ala kadarnya buat prototype
    const newId = Math.random().toString(36).substr(2, 9);
    
    // Tambahin data baru ke daftar yang udah ada
    setStudents([...students, { id: newId, ...newStudent }]);
    
    // Reset form dan tutup modal
    setNewStudent({ nis: "", name: "", className: "10-IPA-1" });
    setIsModalOpen(false);
    alert("Siswa baru berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-[#115e3b]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Master Data Siswa</h1>
            <p className="text-slate-500 font-medium mt-1">Kelola database siswa dan mutasi kelas.</p>
          </div>
        </div>
        
        {/* Tombol Buka Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#115e3b] hover:bg-[#0d4a2e] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
        >
          <Plus className="h-5 w-5" /> Tambah Siswa
        </button>
      </div>

      {/* Toolbar: Search, Filter & Action Area */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
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
            {inputClassOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

      {/* MODAL / POP-UP TAMBAH SISWA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-800">Tambah Peserta Didik Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleAddStudent} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nomor Induk Siswa (NIS)</label>
                <input 
                  type="text" 
                  value={newStudent.nis}
                  onChange={(e) => setNewStudent({...newStudent, nis: e.target.value})}
                  placeholder="Contoh: 1016"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115e3b] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Masukkan nama lengkap..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115e3b] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Penempatan Kelas</label>
                <select 
                  value={newStudent.className}
                  onChange={(e) => setNewStudent({...newStudent, className: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115e3b] outline-none bg-white cursor-pointer"
                >
                  {inputClassOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Modal Footer / Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#115e3b] hover:bg-[#0d4a2e] rounded-xl transition-colors shadow-sm"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}