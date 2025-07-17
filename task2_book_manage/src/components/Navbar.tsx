import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-extrabold text-2xl tracking-wider hover:text-indigo-300">
          ZEPT BOOK APPS
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        <div
          className={`sm:flex sm:items-center sm:space-x-8 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="block mt-3 sm:mt-0 hover:text-indigo-300 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/wishlist"
            className="block mt-3 sm:mt-0 hover:text-indigo-300 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
