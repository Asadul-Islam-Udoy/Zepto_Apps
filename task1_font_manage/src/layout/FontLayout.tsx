
import { ReactNode, useState } from "react";
import DashboardSidebar from "../components/font_management/Sidbar";
import DashboardNavbar from "../components/font_management/Navbar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
