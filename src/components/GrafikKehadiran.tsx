"use function" // <-- Opsional kalau sebelumnya udah pake "use client"
"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GrafikKehadiran() {
  // 1. Siapin wadah buat nampung data dari API
  const [dataGrafik, setDataGrafik] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Jurus narik data pas komponen pertama kali dimuat
  useEffect(() => {
    const ambilDataStatistik = async () => {
      try {
        const response = await fetch("/api/statistik", { cache: "no-store" });
        const hasil = await response.json();
        
        // Masukin hasil tarikan ke wadah
        setDataGrafik(hasil);
      } catch (error) {
        console.error("Gagal nyedot data jendral:", error);
      } finally {
        // Matiin loading kalau udah kelar (sukses/gagal)
        setIsLoading(false);
      }
    };

    ambilDataStatistik();
  }, []);

  // 3. Tampilan pas lagi nunggu data ditarik
  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-white rounded-xl border border-slate-200">
        <span className="text-slate-500 font-medium animate-pulse">
          Menyiapkan Grafik...
        </span>
      </div>
    );
  }

  // 4. Tampilan Grafik Asli
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dataGrafik} // <-- DATA ASLI DARI DATABASE MASUK KESINI!
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#F1F5F9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="total" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}