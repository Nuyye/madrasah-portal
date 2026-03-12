export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dashboard Utama
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selamat datang di MadrasahPortal. Pantau ringkasan data hari ini.
        </p>
      </div>

      {/* Placeholder Cards buat nanti */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Siswa", value: "1,240" },
          { title: "Hadir Hari Ini", value: "1,180" },
          { title: "Sakit/Izin", value: "45" },
          { title: "Alpha (Tanpa Keterangan)", value: "15" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="rounded-xl border bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 p-6"
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-slate-500">{stat.title}</h3>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}