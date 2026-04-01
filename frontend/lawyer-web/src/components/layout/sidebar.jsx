import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "🏠",
      roles: ["admin", "superadmin"]
    },
    {
      name: "Manajemen Blog",
      icon: "📝",
      roles: ["admin", "superadmin"],
      subItems: [
        { name: "Blog", path: "/admin/blogs" },
        { name: "Create blog", path: "/admin/blogs/create" }
      ]
    },
    {
      name: "Manajemen Team",
      path: "/admin/team",
      icon: "👥",
      roles: ["superadmin"]
    },
    {
      name: "Consultation",
      icon: "💬",
      roles: ["admin", "superadmin"],
      subItems: [
        { name: "Consultation Pending", path: "/admin/consultations/pending" },
        { name: "Report", path: "/admin/consultations/report" }
      ]
    },
    {
      name: "Web Settings",
      icon: "⚙️",
      roles: ["superadmin"],
      subItems: [
        { name: "Partners", path: "/admin/partners" },
        { name: "Practice Areas", path: "/admin/practice-areas" }
      ]
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
      roles: ["admin", "superadmin"]
    }
  ];

  return (
    <aside className={`
  fixed md:sticky top-0 left-0 z-50
  h-screen
  ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64
  bg-slate-900 text-white border-r border-slate-800
  flex flex-col
  transition-all duration-300 ease-in-out
  ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0
`}>

      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between">

        {!isCollapsed && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#C5A02E]">
              Lawyer CMS
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase">
              {role} Mode
            </p>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-800 rounded hidden md:block"
        >
          ☰
        </button>

        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-xl"
        >
          ✕
        </button>

      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 md:px-4 space-y-2 mt-4">

        {menuItems.map((item) => {
          if (!item.roles.includes(role)) return null;

          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openDropdowns[item.name];
          const isActive = location.pathname === item.path;

          if (hasSubItems) {
            return (
              <div key={item.name} className="space-y-1">

                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>

                  {!isCollapsed && (
                    <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  )}
                </button>

                {isOpen && !isCollapsed && (
                  <div className="pl-10 md:pl-12 space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block py-2 text-sm ${
                          location.pathname === sub.path
                            ? "text-[#C5A02E]"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                isActive
                  ? "bg-[#C5A02E] text-black"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800 mt-auto">
  <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-slate-400 hover:text-red-400"
  >
    🚪
    {!isCollapsed && <span>Logout</span>}
  </button>
</div>

    </aside>
  );
};

export default Sidebar;