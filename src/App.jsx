import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import DetailNew from "./components/DetailNews/DetailNew";
import "./App.css";
import Category from "./components/Category";
import { AuthProvider } from "./context/AuthContext";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import CreateNews from "./components/Admin/CreateNews";
import Gridnews from "./components/Admin/Gridnews";
import UpdateNews from "./components/Admin/UpdateNews";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";

const isAuthenticated = () => {
  const adminInfo = localStorage.getItem("adminInfo");
  return !!adminInfo; // Trả về true nếu adminInfo tồn tại
};
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Trang người dùng */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/DetailNew/:id" element={<DetailNew />} />
            <Route path="/Category/:category" element={<Category />} />
            <Route path="/Category/:category/:page" element={<Category />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>

          {/* Trang Đăng nhập Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Trang Admin (Bảo vệ) */}
          {/* <Route
              path="/admin/*"
              element={
                isAuthenticated() ? (
                  <LayoutAdmin />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            >
              <Route index element={<CreateNews />} />
              <Route path="listnew" element={<Gridnews />} />
              <Route path="register" element={<AdminRegister />} />
              <Route path="updatenew/:id" element={<UpdateNews />} />
            </Route> */}
          {/* Trang Đăng ký Admin */}
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Trang Admin (chỉ khi đã login) */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated() ? (
                <LayoutAdmin />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          >
            <Route index element={<CreateNews />} />
            <Route path="listnew" element={<Gridnews />} />
            <Route path="updatenew/:id" element={<UpdateNews />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
