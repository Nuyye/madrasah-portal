"use client";

import { useState } from "react";
import { User, Mail, Lock, Shield, Eye, EyeOff, Building, ArrowRight, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // State buat nentuin lagi di mode Login atau Register
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Fungsi pura-pura login (sementara sebelum nyambung database)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kalau sukses, langsung lempar ke portal dashboard
    router.push("/portal"); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-700">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* ✨ Bagian Kiri: Branding & Info Madrasah */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#115e3b] to-[#0d4a2e] p-10 text-white flex flex-col justify-between relative overflow-hidden transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Building className="h-6 w-6 text-emerald-100" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Madrasah<span className="text-amber-400">Portal</span></span>
            </div>
            
            <h1 className="text-3xl font-extrabold mb-4 leading-tight">
              {isLogin ? "Selamat Datang Kembali!" : "Mulai Perjalanan Digital Madrasahmu"}
            </h1>
            <p className="text-emerald-100/80 font-medium transition-all duration-300">
              {isLogin 
                ? "Silakan masuk untuk mengakses sistem tata usaha dan mengelola data akademik madrasah."
                : "Buat akun untuk mengakses sistem tata usaha, rekapitulasi absensi, dan pembinaan siswa terpadu secara efisien."}
            </p>
          </div>

          {/* 🎨 Dekorasi Abstract CSS */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 mt-12 md:mt-0">
            {/* Tanda kutip aman dari linter */}
            <p className="text-sm text-emerald-200/60 font-medium">© 2026 MTs Salafiyah Syafi&apos;iyah.<br/>Dikembangkan oleh Ibnu Athoillah & Ruspian Majid.</p>
          </div>
        </div>

        {/* 📝 Bagian Kanan: Form Dinamis (Login / Register) */}
        <div className="w-full md:w-7/12 p-10 sm:p-14 bg-white flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800">
                {isLogin ? "Masuk ke Sistem" : "Daftar Akun Baru"}
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                {isLogin ? "Masukkan email dan kata sandi Anda yang terdaftar." : "Lengkapi data diri Anda sebagai Tenaga Pendidik / Kependidikan."}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Form Tambahan Khusus Register (Nama & NIP) akan muncul/hilang pake animasi css */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? 'max-h-0 opacity-0 m-0' : 'max-h-40 opacity-100'}`}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="text" placeholder="Sesuai KTP/Ijazah" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#115e3b] outline-none transition-all text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">NIP / ID Pegawai</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="text" placeholder="Masukkan NIP" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#115e3b] outline-none transition-all text-sm font-medium" />
                  </div>
                </div>
              </div>

              {/* Form Email & Password (Selalu Muncul) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="email" required placeholder="nama@madrasah.sch.id" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#115e3b] outline-none transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Kata Sandi</label>
                  {isLogin && (
                    <a href="#" className="text-xs font-bold text-[#115e3b] hover:underline">Lupa sandi?</a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} required placeholder={isLogin ? "Masukkan kata sandi" : "Minimal 8 karakter"} className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#115e3b] outline-none transition-all text-sm font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#115e3b] transition-colors p-1">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Tombol Submit Dinamis */}
              <button type="submit" className="w-full bg-[#115e3b] hover:bg-[#0d4a2e] text-white font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 mt-4 group">
                {isLogin ? "Masuk ke Portal" : "Buat Akun Sekarang"} 
                {isLogin ? <LogIn className="h-5 w-5 group-hover:translate-x-1 transition-transform" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Tombol Toggle Login/Register */}
            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              {isLogin ? "Belum punya akun madrasah?" : "Sudah punya akun madrasah?"}{" "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#115e3b] font-bold hover:underline outline-none"
              >
                {isLogin ? "Daftar di sini" : "Masuk di sini"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}