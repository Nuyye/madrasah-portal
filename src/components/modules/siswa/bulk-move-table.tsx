"use client";

import { useState } from "react";
import { mockStudents } from "@/src/types";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MadrasahAPI } from "@/src/lib/api";

export default function BulkMoveTable() {
  // Masukin mock data ke dalam State biar bisa di-update UI-nya
  const [students, setStudents] = useState(mockStudents);
  const [selected, setSelected] = useState<string[]>([]);
  const [targetClass, setTargetClass] = useState("");
  const [isMoved, setIsMoved] = useState(false);

  // Logic buat Select All
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(students.map((s) => s.id));
    } else {
      setSelected([]);
    }
  };

  // Logic buat Select per baris
  const handleSelectOne = (checked: boolean, id: string) => {
    if (checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== id));
    }
  };

  // Simulasi Update Database & Ganti Kelas di UI
  const handleBulkMove = async () => {
    if (!targetClass) return alert("Pilih kelas tujuan dulu bro!");
    setIsMoved(true);
    
    try {
      // Manggil colokan API yang udah kita bikin!
      await MadrasahAPI.bulkMoveClass(selected, targetClass);
      
      // Update UI setelah API sukses
      setStudents((prev) => 
        prev.map((student) => 
          selected.includes(student.id) 
            ? { ...student, className: targetClass } 
            : student
        )
      );

      alert(`Berhasil memindahkan ${selected.length} siswa ke kelas ${targetClass}`);
      setSelected([]); 
      setTargetClass(""); 
    } catch (error) {
      alert("Waduh, gagal ngirim ke server bro!");
    } finally {
      setIsMoved(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${selected.length > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white font-bold text-emerald-700 shadow-sm">
            {selected.length}
          </span>
          <span className="text-sm font-medium text-slate-700">
            Siswa Terpilih
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select 
            className="text-sm border-slate-300 rounded-md px-3 py-2 bg-white outline-none ring-1 ring-slate-200 focus:ring-emerald-500"
            value={targetClass}
            onChange={(e) => setTargetClass(e.target.value)}
            disabled={selected.length === 0}
          >
            <option value="">-- Pilih Kelas Tujuan --</option>
            <option value="11-IPA-1">11-IPA-1</option>
            <option value="11-IPA-2">11-IPA-2</option>
            <option value="11-IPS-1">11-IPS-1</option>
          </select>
          
          <button 
            onClick={handleBulkMove}
            disabled={selected.length === 0 || !targetClass || isMoved}
            className="flex items-center gap-2 bg-[#115e3b] hover:bg-emerald-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMoved ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            {isMoved ? "Memproses..." : "Pindah Kelas"}
          </button>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox 
                  checked={selected.length === students.length && students.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-bold text-slate-600">NISN</TableHead>
              <TableHead className="font-bold text-slate-600">Nama Siswa</TableHead>
              <TableHead className="font-bold text-slate-600">Kelas Saat Ini</TableHead>
            </TableRow>
          </TableHeader>
         <TableBody>
            {/* INI DIA BIANG KEROKNYA! Pastikan tulisannya students.map, BUKAN mockStudents.map */}
            {students.map((student) => (
              <TableRow key={student.id} className={selected.includes(student.id) ? "bg-emerald-50/50" : ""}>
                <TableCell className="text-center">
                  <Checkbox 
                    checked={selected.includes(student.id)}
                    onCheckedChange={(checked) => handleSelectOne(checked as boolean, student.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-slate-600">{student.nisn}</TableCell>
                <TableCell className="text-slate-900 font-semibold">{student.name}</TableCell>
                <TableCell>
                  {/* Warna badge-nya kita bikin dinamis */}
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${student.className.includes('11') ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700'}`}>
                    {student.className}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}