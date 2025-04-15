// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra cả user và adminInfo
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("adminInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedAdmin) {
      setUser(JSON.parse(storedAdmin));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Lưu ý: Không lưu vào localStorage ở đây để tránh xung đột
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("adminInfo"); // Xóa cả adminInfo khi logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
