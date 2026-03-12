"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // CETAK TIKET DISINI! (Simpan cookie dummy di browser)
      document.cookie = "isLogin=true; path=/; max-age=86400"; // Berlaku 1 hari
      
      router.push("/portal"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Sama Kayak Landing Page Biar Senada */}
      {/* Catatan: Kalau lo udah pakai folder /images, ganti url-nya jadi /images/bg-madrasah.jpg */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d4a2e] via-[#115e3b] to-[#0a3823]"></div>

      {/* Card Form Login */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="p-8 md:p-10">
          
          {/* Header Card */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#115e3b] p-2 rounded-xl shadow-sm">
                <ShieldCheck className="text-white h-7 w-7" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Madrasah<span className="text-[#115e3b]">Portal</span>
              </h1>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Selamat Datang!</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Silakan masuk menggunakan akun admin tata usaha Anda.</p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email / Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  required
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#115e3b] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  placeholder="admin@madrasah.id"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link href="#" className="text-sm font-bold text-[#115e3b] hover:underline">Lupa password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  required
                  className="block w-full pl-11 pr-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#115e3b] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Tombol Submit Amber */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 py-3.5 rounded-xl font-extrabold text-base transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Masuk ke Portal <ArrowRight className="h-5 w-5" /></>
              )}
            </button>
          </form>
        </div>
        
        {/* Footer Card */}
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-sm text-slate-600 font-medium">
            Kembali ke <Link href="/" className="text-[#115e3b] font-bold hover:underline">Halaman Utama</Link>
          </p>
        </div>
      </div>
    </div>
  );
}