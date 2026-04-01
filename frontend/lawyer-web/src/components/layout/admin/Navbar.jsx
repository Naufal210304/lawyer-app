import React from "react";

const Navbar = ({ setIsMobileOpen }) => {
  const role = localStorage.getItem("role") || "user";
  const username = localStorage.getItem("username") || "Admin";

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden text-xl"
        >
          ☰
        </button>

        <h1 className="font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-4">
        <span className="text-xs md:text-sm text-gray-600">
          {username} ({role})
        </span>

        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full"></div>
      </div>

    </div>
  );
};

export default Navbar;