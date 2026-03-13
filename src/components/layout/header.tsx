"use client";

import { useState } from "react";
import { Bell, ChevronDown, CalendarDays } from "lucide-react";

export default function Header() {
  // Logic auto-generate Tahun Ajaran (Biar lo nggak usah input manual tiap tahun)
  // Ngambil tahun sekarang (misal 2026), terus bikin list dari 2 tahun lalu sampai 5 tahun ke depan
  const currentYear = new Date().getFullYear();
  const generateTahunAjaran = () => {
    const list: string[] = [];
    for (let i = currentYear - 2; i <= currentYear + 5; i++) {
      list.push(`${i}/${i + 1}`);
    }
    return list;
  };

  const listTahunAjaran = generateTahunAjaran();
  
  // State default kita set ke tahun sekarang
  const [activeTahunAjaran, setActiveTahunAjaran] = useState(`${currentYear}/${currentYear + 1}`);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm sticky top-0 z-30">
      
      {/* Kiri: Dropdown Tahun Ajaran (Global Context) */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-[#115e3b] px-3 py-1.5 rounded-lg border border-emerald-100">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm font-bold">Tahun Ajaran:</span>
        </div>
        <div className="relative">
          <select 
            value={activeTahunAjaran}
            onChange={(e) => setActiveTahunAjaran(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm font-extrabold rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#115e3b] cursor-pointer"
          >
            {listTahunAjaran.map((tahun) => (
              <option key={tahun} value={tahun}>{tahun}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Kanan: Profil & Notifikasi */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700">Ibnu Athoillah</p>
            <p className="text-xs font-medium text-slate-500">Admin Tata Usaha</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-[#115e3b] text-white flex items-center justify-center font-bold shadow-sm">
            IA
          </div>
        </div>
      </div>
      
    </header>
  );
}