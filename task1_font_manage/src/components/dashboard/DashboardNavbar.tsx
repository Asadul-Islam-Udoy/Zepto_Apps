import { Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}
function DashboardNavbar({ onMenuClick }: Props) {
  return (
    <div className="bg-white shadow h-16 flex items-center justify-between px-4">
      {/* Show hamburger only on mobile */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu />
      </button>

      <div className="font-semibold text-xl">My Dashboard</div>

      <div className="space-x-4">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Login</button>
      </div>
    </div>
  );
}

export default DashboardNavbar
