import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const DashboardSidebar = ({ open, setOpen }: Props) => {
   return (
    <div
      className={`fixed z-20 inset-y-0 mt-16 left-0 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:inset-0 transition-transform duration-200 ease-in-out bg-gray-400 text-white w-64 h-full`}
    >
      
      <div className="flex items-center border-b  justify-between p-4 md:hidden">
        <span className="font-bold text-lg">Dashboard</span>
        <button onClick={() => setOpen(false)}>
          <X />
        </button>
      </div>

      <div className="hidden md:flex border-b items-center p-[15px] justify-center p-[18px] font-bold text-lg">
        Dashboard
      </div>

      <nav className="mt-4 space-y-2 px-2">
        <Link to="/" className="block px-4 border py-2 rounded hover:bg-gray-700">
          Home
        </Link>
        <Link to="/fontuploader" className="block border px-4 py-2 rounded hover:bg-gray-700">
          Upload Single Font
        </Link>
        <Link to="/fontlist" className="block border px-4 py-2 rounded hover:bg-gray-700">
          Upload Group Font
        </Link>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
