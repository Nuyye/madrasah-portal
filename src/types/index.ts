// src/types/index.ts

// 1. Kontrak Data Siswa
export interface Student {
  id: string;
  nisn: string;
  name: string;
  className: string;
}

// 2. Kontrak Data Status Absen (Pisah A, I, S sesuai Blueprint)
export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpha' | null;

// 3. Kontrak Data Rekap Absensi Harian per Siswa
export interface AttendanceRecord {
  studentId: string;
  date: string; // Format: YYYY-MM-DD
  status: AttendanceStatus;
}

// ==========================================
// MOCK DATA (Data Bohongan Buat Ngetes UI)
// ==========================================

export const mockStudents: Student[] = [
  { id: "S001", nisn: "0012345678", name: "Ahmad Faisal", className: "10-IPA-1" },
  { id: "S002", nisn: "0012345679", name: "Budi Santoso", className: "10-IPA-1" },
  { id: "S003", nisn: "0012345680", name: "Citra Kirana", className: "10-IPA-1" },
  { id: "S004", nisn: "0012345681", name: "Dina Mariana", className: "10-IPA-1" },
  { id: "S005", nisn: "0012345682", name: "Eko Prasetyo", className: "10-IPA-1" },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { studentId: "S001", date: "2026-03-12", status: "Hadir" },
  { studentId: "S002", date: "2026-03-12", status: "Sakit" },
  { studentId: "S003", date: "2026-03-12", status: "Izin" },
  { studentId: "S004", date: "2026-03-12", status: "Alpha" },
  { studentId: "S005", date: "2026-03-12", status: null }, // Contoh belum diabsen
];