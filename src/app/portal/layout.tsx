import Sidebar from "@/src/components/layout/sidebar";
import Header from "@/src/components/layout/header";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar dibiarin lepas tanpa bungkus, karena dia udah bisa ngatur ukurannya sendiri dari dalem */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}