"use client";

import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  PlusCircle,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    // Get admin info from localStorage
    const storedAdminInfo = localStorage.getItem("adminInfo");
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("adminInfo");
      navigate("/admin/login", { replace: true });
    }
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
      exact: true,
    },
    {
      title: "Articles",
      icon: <FileText size={20} />,
      submenu: true,
      submenuItems: [
        { title: "All Articles", path: "/admin/listnew" },
        { title: "Add New", path: "/admin" },
        { title: "Categories", path: "/admin/categories" },
      ],
    },
    {
      title: "Users",
      icon: <Users size={20} />,
      submenu: true,
      submenuItems: [
        { title: "All Users", path: "/admin/users" },
        { title: "Add Admin", path: "/admin/register" },
      ],
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 transition-all duration-300 ease-in-out w-64 lg:w-72 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wider">
            News<span className="text-yellow-400">Admin</span>
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Admin info */}
        {adminInfo && (
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                {adminInfo.avatar ? (
                  <img
                    src={adminInfo.avatar || "/placeholder.svg"}
                    alt={adminInfo.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {adminInfo.fullname
                      ? adminInfo.fullname.charAt(0).toUpperCase()
                      : "A"}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {adminInfo.fullname || "Admin User"}
                </p>
                <p className="text-xs text-gray-400">
                  {adminInfo.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeMenu === item.title
                          ? "bg-indigo-700"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-400">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      {activeMenu === item.title ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {activeMenu === item.title && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.submenuItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm rounded-lg transition-colors ${
                                  isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive
                          ? "bg-indigo-700 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </NavLink>
                )}
              </li>
            ))}

            {/* Quick action */}
            <li className="pt-4">
              <NavLink
                to="/admin"
                className="flex items-center px-4 py-2.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white hover:from-indigo-700 hover:to-purple-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle size={20} className="mr-3" />
                <span>Create New Article</span>
              </NavLink>
            </li>

            {/* Logout */}
            <li className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 text-sm rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
