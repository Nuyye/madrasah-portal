"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Users, ShieldAlert, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isMobileOpen, setIsMobileOpen] = useState(false); 

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login");
  };

  return (
    <>
      {/* 🍔 Tombol Hamburger HP */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-[#115e3b] text-white p-4 rounded-full shadow-2xl hover:bg-[#0d4a2e] transition-transform active:scale-95"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* 🌑 Overlay HP */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 📦 Sidebar Utama */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 h-full flex flex-col bg-[#0d4a2e] text-white transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isCollapsed ? 'md:w-20' : 'md:w-64'} 
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-emerald-800/50 flex-shrink-0 relative">
          <div className={`font-extrabold text-xl tracking-tight transition-all duration-300 absolute ${isCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
            Madrasah<span className="text-amber-400">Portal</span>
          </div>
          <div className={`font-extrabold text-2xl tracking-tight text-amber-400 transition-all duration-300 absolute ${!isCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
            MP
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden absolute right-4 text-emerald-300 hover:text-white transition-colors p-1 rounded-md hover:bg-emerald-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Area Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">
          
          <Link href="/portal" title={isCollapsed ? "Dashboard Utama" : ""} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive('/portal') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800/60'}`}>
            <LayoutDashboard className={`h-5 w-5 flex-shrink-0 ${isActive('/portal') ? 'text-[#0d4a2e]' : 'text-emerald-200 group-hover:text-white'}`} /> 
            {!isCollapsed && <span className="whitespace-nowrap">Dashboard Utama</span>}
          </Link>

          {!isCollapsed ? (
            <div className="pt-4 pb-2">
              <p className="px-3 text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest whitespace-nowrap">Modul Madrasah</p>
            </div>
          ) : (
             <div className="border-t border-emerald-800/50 my-4 mx-2"></div>
          )}

          <Link href="/portal/absensi" title={isCollapsed ? "Rekap Absensi" : ""} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive('/portal/absensi') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800/60'}`}>
            <CalendarCheck className={`h-5 w-5 flex-shrink-0 ${isActive('/portal/absensi') ? 'text-[#0d4a2e]' : 'text-emerald-200 group-hover:text-white'}`} /> 
             {!isCollapsed && <span className="whitespace-nowrap">Rekap Absensi</span>}
          </Link>

          <Link href="/portal/siswa" title={isCollapsed ? "Data Siswa" : ""} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive('/portal/siswa') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800/60'}`}>
            <Users className={`h-5 w-5 flex-shrink-0 ${isActive('/portal/siswa') ? 'text-[#0d4a2e]' : 'text-emerald-200 group-hover:text-white'}`} /> 
             {!isCollapsed && <span className="whitespace-nowrap">Data Siswa</span>}
          </Link>

          <Link href="/portal/pembinaan" title={isCollapsed ? "Pembinaan" : ""} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive('/portal/pembinaan') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800/60'}`}>
            <ShieldAlert className={`h-5 w-5 flex-shrink-0 ${isActive('/portal/pembinaan') ? 'text-[#0d4a2e]' : 'text-emerald-200 group-hover:text-white'}`} /> 
             {!isCollapsed && <span className="whitespace-nowrap">Pembinaan</span>}
          </Link>

           {!isCollapsed ? (
            <div className="pt-4 pb-2">
              <p className="px-3 text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest whitespace-nowrap">Lainnya</p>
            </div>
          ) : (
             <div className="border-t border-emerald-800/50 my-4 mx-2"></div>
          )}
          
          <Link href="/portal/pengaturan" title={isCollapsed ? "Pengaturan" : ""} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive('/portal/pengaturan') ? 'bg-white text-[#0d4a2e] font-bold shadow-sm' : 'font-medium hover:bg-emerald-800/60'}`}>
            <Settings className={`h-5 w-5 flex-shrink-0 ${isActive('/portal/pengaturan') ? 'text-[#0d4a2e]' : 'text-emerald-200 group-hover:text-white'}`} /> 
             {!isCollapsed && <span className="whitespace-nowrap">Pengaturan</span>}
          </Link>
        </nav>

        {/* 🚪 TOMBOL LOGOUT & TOGGLE */}
        <div className="p-3 border-t border-emerald-800/50 space-y-2 flex flex-col items-center">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-full py-2 bg-[#0a3a24] hover:bg-emerald-900 rounded-xl text-emerald-300 transition-colors shadow-inner"
            title={isCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>

          <button 
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-3 w-full rounded-xl text-sm font-bold text-red-300 hover:bg-red-500 hover:text-white transition-all overflow-hidden group`}
            title="Keluar Sistem"
          >
            <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
            {!isCollapsed && <span className="whitespace-nowrap">Keluar Sistem</span>}
          </button>
        </div>
      </aside>
    </>
  );
}