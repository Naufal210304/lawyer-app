import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Direct imports are safer and support Tree Shaking
// Note: If you are using the Free version, change 'pro-light' to 'free-solid'
// and the prefix from 'fal' to 'fas' in your mind (the icon names remain similar)
import { 
  faHouse, 
  faNewspaper, 
  faFileLines, 
  faFileCirclePlus, 
  faUsers, 
  faComments, 
  faGear,
  faGlobe,
  faDoorOpen,
  faClock,
  faChartLine,
  faHandshake,
  faScaleBalanced
} from '@fortawesome/free-solid-svg-icons';

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
      icon: faHouse,
      roles: ["admin", "superadmin"]
    },
    {
      name: "Manajemen Blog",
      icon: faNewspaper,
      roles: ["admin", "superadmin"],
      subItems: [
        { name: "Blog", path: "/admin/blogs", icon: faFileLines },
        { name: "Create blog", path: "/admin/blogs/create", icon: faFileCirclePlus }
      ]
    },
    {
      name: "Manajemen Team",
      path: "/admin/team",
      icon: faUsers,
      roles: ["admin", "superadmin"]
    },
    {
      name: "Consultation",
      icon: faComments,
      roles: ["admin", "superadmin"],
      subItems: [
        { name: "Consultation Pending", path: "/admin/consultations/pending", icon: faClock },
        { name: "Report", path: "/admin/consultations/report", icon: faChartLine }
      ]
    },
    {
      name: "Web Settings",
      icon: faGlobe,
      roles: ["admin", "superadmin"],
      subItems: [
        { name: "Partners", path: "/admin/partners", icon: faHandshake },
        { name: "Practice Areas", path: "/admin/practice", icon: faScaleBalanced }
      ]
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: faGear,
      roles: ["admin", "superadmin"]
    }
  ];

  return (
    <aside className={`
  fixed md:sticky top-0 left-0 z-50
  h-screen
  ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64
  bg-white text-slate-900 border-r border-slate-200
  flex flex-col
  transition-all duration-300 ease-in-out
  ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0
`}>

      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">

        {!isCollapsed && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-blue-600">
              Lawyer CMS
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase font-medium">
              {role} Mode
            </p>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-100 rounded hidden md:block text-slate-600"
        >
          ☰
        </button>

        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-xl text-slate-600"
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
                  className="w-full flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 w-5 flex justify-center">
                      {typeof item.icon === 'string' ? item.icon : <FontAwesomeIcon icon={item.icon} />}
                    </span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>

                  {!isCollapsed && (
                    <span className={`transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
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
                            ? "text-blue-600 font-semibold"
                            : "text-slate-500 hover:text-blue-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {sub.icon && (
                            <FontAwesomeIcon icon={sub.icon} className="w-3.5 h-3.5" />
                          )}
                          <span>{sub.name}</span>
                        </div>
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
              className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span className={`${isActive ? "text-white" : "text-blue-600"} w-5 flex justify-center`}>
                {typeof item.icon === 'string' ? item.icon : <FontAwesomeIcon icon={item.icon} />}
              </span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100 mt-auto">
  <button
    onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
  >
          <span className="text-blue-600"><FontAwesomeIcon icon={faDoorOpen} /></span>
    {!isCollapsed && <span>Logout</span>}
  </button>
</div>

    </aside>
  );
};

export default Sidebar;