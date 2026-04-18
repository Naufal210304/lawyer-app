import React from "react";
import useAuth from "../../../hooks/useAuth";

const Navbar = ({ setIsMobileOpen }) => {
  const { role, username, profilePic } = useAuth();
  
  const displayUsername = username || "Admin";
  const profilePicUrl = profilePic
    ? profilePic.startsWith('http')
      ? profilePic
      : `http://localhost:3001${profilePic}`
    : null;

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
          {displayUsername} ({role})
        </span>

        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          {profilePicUrl ? (
            <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-sm uppercase">
              {displayUsername.charAt(0)}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;