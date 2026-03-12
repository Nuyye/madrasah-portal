import { Users, CheckCircle2, Stethoscope, UserMinus } from "lucide-react";
import OverviewChart from "@/src/components/modules/dashboard/overview-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard Utama
        </h2>
        <p className="text-sm text-slate-500">
          Selamat datang kembali! Pantau kondisi absensi hari ini.
        </p>
      </div>

      {/* 4 Card Statistik */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "TOTAL SISWA", value: "1,240", icon: Users, color: "text-blue-500" },
          { title: "HADIR HARI INI", value: "1,180", icon: CheckCircle2, color: "text-emerald-500" },
          { title: "SAKIT / IZIN", value: "45", icon: Stethoscope, color: "text-amber-500" },
          { title: "ALPHA", value: "15", icon: UserMinus, color: "text-red-500" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 relative overflow-hidden flex items-center justify-between">
              <div className="relative z-10">
                <h3 className="tracking-tight text-xs font-bold text-slate-500 mb-2 uppercase">{stat.title}</h3>
                <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
                <Icon className="h-8 w-8" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Area Grafik Mingguan */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-7 lg:col-span-4">
          <OverviewChart />
        </div>
        
        {/* Papan Pengumuman / Info Dummy di Sebelah Kanan */}
        <div className="col-span-7 lg:col-span-3 border border-slate-200 rounded-xl bg-white shadow-sm p-6">
           <h3 className="font-bold text-slate-900 mb-4">Aktivitas Terkini</h3>
           <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="h-2 w-2 mt-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Rekap Kelas 10-IPA-{item} selesai</p>
                    <p className="text-xs text-slate-500">Oleh Wali Kelas - 10 Menit yang lalu</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}