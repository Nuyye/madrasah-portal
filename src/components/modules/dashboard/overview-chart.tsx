"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Data dummy buat grafik mingguan
const data = [
  { name: "Senin", Hadir: 1180, SakitIzin: 50, Alpha: 10 },
  { name: "Selasa", Hadir: 1190, SakitIzin: 42, Alpha: 8 },
  { name: "Rabu", Hadir: 1175, SakitIzin: 50, Alpha: 15 },
  { name: "Kamis", Hadir: 1200, SakitIzin: 35, Alpha: 5 },
  { name: "Jumat", Hadir: 1185, SakitIzin: 43, Alpha: 12 },
];

export default function OverviewChart() {
  return (
    <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-slate-900">Tren Kehadiran Mingguan</h3>
        <p className="text-sm text-slate-500">Statistik absensi 5 hari terakhir</p>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`} 
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
            />
            {/* Warna Hijau (Hadir), Kuning (Sakit/Izin), Merah (Alpha) */}
            <Bar dataKey="Hadir" fill="#10b981" radius={[0, 0, 4, 4]} stackId="a" />
            <Bar dataKey="SakitIzin" fill="#f59e0b" stackId="a" />
            <Bar dataKey="Alpha" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}