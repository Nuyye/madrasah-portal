"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Data dummy sementara
const data = [
  { name: 'Sakit', total: 620 },
  { name: 'Izin', total: 220 },
  { name: 'Alpha', total: 1050 },
];

// Warna batang tetap sama (Kuning, Biru, Merah)
const COLORS = ['#eab308', '#3b82f6', '#ef4444'];

export default function GrafikKehadiran() {
  return (
    // Background diubah jadi putih, border disamain kayak kartu lain
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6 border-b border-slate-100 pb-4">
        {/* Teks judul diubah jadi warna gelap (slate-800) */}
        <h2 className="text-xl font-extrabold text-slate-800">Grafik Kehadiran (November 2025/2026)</h2>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {/* Garis background grid diterangin */}
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            {/* Warna teks axis diterangin */}
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 14 }} />
            {/* Tooltip disesuaikan tema terang */}
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-6">
         <div className="flex items-center gap-2">
            <div className="w-8 h-3 bg-amber-500 rounded-sm"></div>
            {/* Teks legend disesuaikan */}
            <span className="text-slate-500 text-sm font-bold">Jumlah Hari</span>
         </div>
      </div>
    </div>
  );
}