import Link from "next/link";
import { LayoutDashboard, Users, CalendarCheck, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#115e3b] text-white flex-col h-full hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-emerald-800">
        <h1 className="text-xl font-bold">Madrasah<span className="text-emerald-300">Portal</span></h1>
      </div>
      
     <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Link Dashboard */}
        <Link href="/portal" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-emerald-50 hover:bg-emerald-800 transition-colors">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard Utama
        </Link>
        
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">
            Modul Madrasah
          </p>
        </div>
        
        {/* Link Absensi */}
        <Link href="/portal/absensi" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-bold bg-emerald-50 text-[#115e3b] shadow-sm transition-colors">
          <CalendarCheck className="h-5 w-5" />
          Rekap Absensi
        </Link>
        
        {/* Link Data Siswa */}
        <Link href="/portal/siswa" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-emerald-50 hover:bg-emerald-800 transition-colors">
          <Users className="h-5 w-5" />
          Data Siswa
        </Link>
      </nav>

      <div className="p-4 border-t border-emerald-800">
        <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-emerald-50 hover:bg-emerald-800 transition-colors">
          <Settings className="h-5 w-5" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}