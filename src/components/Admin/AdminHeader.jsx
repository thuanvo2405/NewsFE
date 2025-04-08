"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Search, User } from "lucide-react";

const AdminHeader = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin info from localStorage
    const storedAdminInfo = localStorage.getItem("adminInfo");
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo));
    }

    // Mock notifications - in a real app, fetch from API
    setNotifications([
      {
        id: 1,
        message: "New user registered",
        time: "5 minutes ago",
        read: false,
      },
      {
        id: 2,
        message: "New article published",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        message: "System update completed",
        time: "Yesterday",
        read: true,
      },
    ]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("adminInfo");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md fixed w-full z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            News<span className="text-yellow-300">Admin</span>
          </h1>
        </div>

        {/* Middle section - Search */}
        <div className="hidden md:block flex-grow max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search articles, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/70"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
              size={18}
            />
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg text-gray-800 z-50 overflow-hidden">
                <div className="p-3 bg-gray-100 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-center text-gray-500">
                      No notifications
                    </p>
                  )}
                </div>
                <div className="p-2 text-center border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin profile */}
          <div className="flex items-center">
            <div className="hidden md:block mr-3 text-right">
              <p className="text-sm font-medium leading-tight">
                {adminInfo?.fullname || "Admin User"}
              </p>
              <p className="text-xs text-indigo-200">
                {adminInfo?.email || "admin@example.com"}
              </p>
            </div>
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                {adminInfo?.avatar ? (
                  <img
                    src={adminInfo.avatar || "/placeholder.svg"}
                    alt="Admin"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </button>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-800 z-50 hidden group-hover:block">
                <div className="p-2">
                  <button
                    onClick={() => navigate("/admin/profile")}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/admin/settings")}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                  >
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1.5 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/70"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
            size={18}
          />
        </form>
      </div>
    </header>
  );
};

export default AdminHeader;
