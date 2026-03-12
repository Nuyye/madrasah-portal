import { Bell, Search, Menu, LayoutDashboard, CalendarCheck, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Bagian Kiri (Hamburger Menu HP & Search) */}
      <div className="flex items-center gap-4">
        
        {/* Hamburger Menu (CUMA MUNCUL DI HP) */}
        <Sheet>
          <SheetTrigger className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-[#0d4a2e] border-r-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu Navigasi</SheetTitle>
            </SheetHeader>
            {/* Isi Navigasi HP (Sama kayak Sidebar) */}
            <div className="h-full flex flex-col text-white">
              <div className="h-16 flex items-center px-6 border-b border-emerald-800/50 font-extrabold text-xl tracking-tight">
                Madrasah<span className="text-amber-400">Portal</span>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link href="/portal" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors">
                  <LayoutDashboard className="h-5 w-5" /> Dashboard Utama
                </Link>
                <div className="pt-4 pb-2">
                  <p className="px-3 text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Modul Madrasah</p>
                </div>
                <Link href="/portal/absensi" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-bold hover:bg-emerald-800 transition-colors">
                  <CalendarCheck className="h-5 w-5" /> Rekap Absensi
                </Link>
                <Link href="/portal/siswa" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors">
                  <Users className="h-5 w-5" /> Data Siswa
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search Bar (Cuma Muncul di Layar Gede) */}
        <div className="hidden md:flex items-center relative w-64">
          <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari siswa atau kelas..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" 
          />
        </div>
      </div>

      {/* Bagian Kanan (Notif & Profile) */}
      <div className="flex items-center gap-3 md:gap-4">
         <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
         </button>
         <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-emerald-600 border-2 border-emerald-100 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            IA
         </div>
      </div>
    </header>
  );
}