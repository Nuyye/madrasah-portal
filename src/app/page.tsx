import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, CheckCircle, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar Landing Page */}
      <header className="h-20 bg-white px-6 md:px-12 flex items-center justify-between shadow-sm z-20 relative">
        <div className="flex items-center gap-2">
          <div className="bg-[#115e3b] p-1.5 rounded-lg">
            <ShieldCheck className="text-white h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Madrasah<span className="text-[#115e3b]">Portal</span>
          </h1>
        </div>
        <Link 
          href="/login" 
          className="px-6 py-2.5 rounded-full border-2 border-[#115e3b] text-[#115e3b] font-bold hover:bg-[#115e3b] hover:text-white transition-all shadow-sm"
        >
          Login Admin
        </Link>
      </header>

      {/* Hero Section dengan Background Gambar Samar */}
      <section className="relative bg-[#0d4a2e] py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* 1. LAYER GAMBAR BACKGROUND (Ganti URL-nya nanti) */}
        <div 
          className="absolute inset-0 bg-[url('/assets/bg-madrasah.jpg')] bg-cover bg-center bg-no-repeat opacity-100 mix-blend-overlay"
        ></div>
        
        {/* 2. LAYER GRADIENT (Biar teks tetap kontras dan gampang dibaca) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a2e] via-[#0d4a2e]/80 to-transparent"></div>

        {/* 3. KONTEN UTAMA */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge Atas */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-900/50 text-emerald-200 text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Sistem Manajemen Madrasah v1.0
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Solusi Cerdas Digitalisasi <br />
            <span className="text-amber-400">Administrasi Madrasah</span>
          </h2>

          <p className="text-emerald-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
            Kelola rekap absensi dan database siswa madrasah lebih cepat, terpusat, dan otomatis tanpa perlu pusing tumpukan kertas lagi.
          </p>

          {/* Tombol Akses (Tombol Demo udah dihapus) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/portal" 
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-extrabold text-lg transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
            >
              Mulai Akses Sekarang <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-emerald-50/50 flex-1">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold text-slate-800 mb-16">Teknologi Pendidikan Masa Depan</h3>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-emerald-50 text-[#115e3b] rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Rekap Otomatis</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                Input kehadiran massal dan konversi Alpha secara otomatis. Hemat waktu kerja staf TU madrasah.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Database Terpusat</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                Seluruh data siswa dan riwayat kenaikan kelas tersimpan aman dan terintegrasi di satu platform.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">User Friendly</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                Desain antarmuka dirancang senyaman mungkin agar mudah dioperasikan oleh guru dan staf administrasi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}