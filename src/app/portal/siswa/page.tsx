import BulkMoveTable from "@/src/components/modules/siswa/bulk-move-table";

export default function DataSiswaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Data Siswa
        </h2>
        <p className="text-sm text-slate-500">
          Kelola database siswa, termasuk fitur kenaikan dan perpindahan kelas massal.
        </p>
      </div>

      <BulkMoveTable />
    </div>
  );
}