"use client";

import { useState } from "react";
import { mockStudents, AttendanceStatus } from "@/src/types";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Save, CheckCircle2, Loader2 } from "lucide-react";

export default function AbsenTable() {
  // State buat nyimpen data absen harian sementara
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fungsi buat nanganin perubahan status absen
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    setSaved(false); // Reset status saved kalau ada perubahan baru
  };

  // Simulasi Auto-Save / Save Manual ke API
  const handleSave = () => {
    setIsSaving(true);
    // Simulasi delay API backend 1 detik
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      // Nanti di sini wiring ke fungsi fetch() / axios ke backend temen lo
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Input Absensi Harian</h3>
          <p className="text-sm text-slate-500">Kelas: 10-IPA-1 | Tanggal: 12 Maret 2026</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#115e3b] hover:bg-emerald-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all disabled:opacity-70"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Menyimpan..." : saved ? "Tersimpan" : "Simpan Data"}
        </button>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-slate-600">NISN</TableHead>
              <TableHead className="font-bold text-slate-600">Nama Siswa</TableHead>
              <TableHead className="w-[300px] font-bold text-slate-600">Status Kehadiran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-emerald-50/50 transition-colors">
                <TableCell className="font-medium text-slate-600">{student.nisn}</TableCell>
                <TableCell className="text-slate-900 font-semibold">{student.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {['Hadir', 'Sakit', 'Izin', 'Alpha'].map((status) => {
                      const isSelected = attendance[student.id] === status;
                      
                      // Logic warna badge per status
                      let colorClass = "bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent";
                      if (isSelected) {
                        if (status === 'Hadir') colorClass = "bg-emerald-100 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500";
                        if (status === 'Sakit') colorClass = "bg-amber-100 text-amber-800 border-amber-300 ring-1 ring-amber-500";
                        if (status === 'Izin') colorClass = "bg-blue-100 text-blue-800 border-blue-300 ring-1 ring-blue-500";
                        if (status === 'Alpha') colorClass = "bg-red-100 text-red-800 border-red-300 ring-1 ring-red-500";
                      }

                      return (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(student.id, status as AttendanceStatus)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${colorClass}`}
                        >
                          {status === 'Alpha' ? 'A' : status === 'Izin' ? 'I' : status === 'Sakit' ? 'S' : 'H'}
                        </button>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}