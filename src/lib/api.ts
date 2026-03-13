import { mockStudents } from "@/src/types";

// Nanti temen Back-End lo tinggal masukin URL aslinya di file .env
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const MadrasahAPI = {
  // 1. Fungsi buat ngambil data siswa dari Database
  getStudents: async () => {
    /* NANTI TEMEN LO TINGGAL UNCOMMENT CODE DI BAWAH INI:
      const response = await fetch(`${API_URL}/students`);
      return response.json();
    */

    // Buat sekarang, kita simulasiin nunggu loading jaringan 1 detik
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStudents), 1000);
    });
  },

  // 2. Fungsi buat ngirim data absensi harian
  submitAbsensi: async (dataAbsen: Record<string, string>) => {
    /* NANTI TEMEN LO TINGGAL UNCOMMENT CODE INI:
      const response = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataAbsen)
      });
      return response.json();
    */
    
    console.log("[API MOCK] Data absen berhasil dikirim ke server:", dataAbsen);
    return { success: true, message: "Absensi tersimpan!" };
  },

  // 3. Fungsi buat pindah kelas massal
  bulkMoveClass: async (studentIds: string[], targetClass: string) => {
    // Simulasi pengiriman data
    console.log(`[API MOCK] Memindahkan ${studentIds.length} siswa ke kelas ${targetClass}`);
    return { success: true };
  },

  // 4. Fungsi khusus buat ngirim data REKAP BULANAN mateng (lengkap sama hasil konversi)
  submitRekapAbsensi: async (dataRekap: Record<string, unknown>) => {
    /* NANTI TEMEN LO TINGGAL UNCOMMENT CODE INI:
      const response = await fetch(`${API_URL}/rekap-absensi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rekap: dataRekap })
      });
      return response.json();
    */
    
    // Simulasi API jalan
    console.log("[API MOCK] Mengirim payload rekap ke server:", dataRekap);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Rekapitulasi tersimpan!" });
      }, 1000);
    });
  },
};
