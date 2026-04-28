"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Data dummy sementara
const data = [
  { name: 'Sakit', total: 620 },
  { name: 'Izin', total: 220 },
  { name: 'Alpha', total: 1050 },
];

const COLORS = ['#eab308', '#3b82f6', '#ef4444'];

export default function GrafikKehadiran() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-extrabold text-white">Grafik Kehadiran (November 2025/2026)</h2>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <Tooltip 
              cursor={{ fill: '#1e293b' }}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-4">
         <div className="flex items-center gap-2">
            <div className="w-8 h-3 bg-amber-500 rounded-sm"></div>
            <span className="text-slate-400 text-sm font-medium">Jumlah Hari</span>
         </div>
      </div>
    </div>
  );
}