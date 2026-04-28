"use client";

import GrafikKehadiran from "../../components/GrafikKehadiran";
import { Users, BookOpen, ShieldAlert, Calendar, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Data Dummy Statistik
  const stats = [
    { title: "Total Peserta Didik", value: "142", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Kelas Aktif", value: "12", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Siswa Dalam Pembinaan", value: "3", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 🌟 Header Welcome Card */}
      <div className="relative bg-gradient-to-r from-[#115e3b] to-[#0d4a2e] rounded-2xl p-8 shadow-sm overflow-hidden text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">Selamat Datang, Bapak Ibnu Athoillah! 👋</h1>
          <p className="text-emerald-100/80 font-medium max-w-xl">
            Sistem Informasi Tata Usaha dan Rekapitulasi Absensi Madrasah Tsanawiyah &quot;Salafiyah Syafi&apos;iyah&quot; siap digunakan. Semoga harimu menyenangkan!
          </p>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute right-32 bottom-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl translate-y-1/2"></div>
      </div>

      {/* 📊 Kartu Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 Area Grafik & Menu Cepat (Dibagi 3 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Grafik (Makan 2 Kolom) */}
        <div className="lg:col-span-2">
          <GrafikKehadiran />
        </div>

        {/* 🚀 Kolom Menu Cepat (Quick Actions) (Makan 1 Kolom) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-[#115e3b]" /> Akses Cepat
          </h2>
          
          <div className="flex flex-col gap-3 flex-1">
            <Link href="/portal/absensi" className="p-4 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-[#115e3b] rounded-lg group-hover:bg-[#115e3b] group-hover:text-white transition-colors">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Input Absen Baru</h3>
                  <p className="text-xs text-slate-500">Rekap mingguan kelas</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#115e3b] transition-transform group-hover:translate-x-1" />
            </Link>

            <Link href="/portal/pembinaan" className="p-4 rounded-xl border border-slate-100 hover:border-red-500 hover:bg-red-50 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Cetak Surat Peringatan</h3>
                  <p className="text-xs text-slate-500">Siswa alpha &ge; 3</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
            </Link>

             <Link href="/portal/siswa" className="p-4 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Kelola Data Siswa</h3>
                  <p className="text-xs text-slate-500">Mutasi &amp; Master Data</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}