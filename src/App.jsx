import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import DetailNew from "./components/DetailNews/DetailNew";
import "./App.css";
import Category from "./components/Category";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Thêm AuthContext
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import CreateNews from "./components/Admin/CreateNews";
import Gridnews from "./components/Admin/Gridnews";
import UpdateNews from "./components/Admin/UpdateNews";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import { useContext } from "react"; // Thêm useContext

// Tạo component PrivateRoute để kiểm tra xác thực
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/admin/login" replace />;
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

          {/* Trang Admin (Bảo vệ bởi PrivateRoute) */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <LayoutAdmin />
              </PrivateRoute>
            }
          >
            <Route index element={<CreateNews />} />
            <Route path="listnew" element={<Gridnews />} />
            <Route path="updatenew/:id" element={<UpdateNews />} />
          </Route>

          {/* Trang Đăng ký Admin */}
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
