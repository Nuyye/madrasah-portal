"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Users, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname(); // Sensor buat ngedeteksi URL sekarang

  // Fungsi helper biar gampang nentuin warna menu
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="h-full flex flex-col bg-[#0d4a2e] text-white overflow-y-auto">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-emerald-800/50 font-extrabold text-xl tracking-tight">
        Madrasah<span className="text-amber-400">Portal</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link 
          href="/portal" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive('/portal') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800'}`}
        >
          <LayoutDashboard className="h-5 w-5" /> Dashboard Utama
        </Link>

        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Modul Madrasah</p>
        </div>

        <Link 
          href="/portal/absensi" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive('/portal/absensi') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800'}`}
        >
          <CalendarCheck className="h-5 w-5" /> Rekap Absensi
        </Link>

        <Link 
          href="/portal/siswa" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive('/portal/siswa') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800'}`}
        >
          <Users className="h-5 w-5" /> Data Siswa
        </Link>

        <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Lainnya</p>
        </div>
        
        <Link 
          href="/portal/pengaturan" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive('/portal/pengaturan') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800'}`}
        >
          <Settings className="h-5 w-5" /> Pengaturan
        </Link>
      </nav>
    </aside>
  );
}