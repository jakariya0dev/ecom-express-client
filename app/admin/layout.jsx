import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function layout({ children }) {
  return (
    <div className="flex min-h-screen overflow-hidden max-w-7xl mx-auto">
      {/* sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto mx-4">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
