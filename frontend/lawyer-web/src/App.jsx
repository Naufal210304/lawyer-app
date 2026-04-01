import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import PracticeArea from "./pages/PracticeArea";
import Team from "./pages/OurTeam";
import Partners from "./pages/OurPartners";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

// ADMIN
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogManagement from "./pages/admin/Blog";
import CreateBlog from "./pages/admin/CreateBlog";

// AUTH
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layout/Layout";

// 🔥 Layout Wrapper (biar bisa pakai useLocation)
const Layout = () => {
  const location = useLocation();

  // Cek apakah route admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Navbar hanya muncul di client */}
      {!isAdminRoute && <Navbar />}

      <main className={`${isAdminRoute ? 'pt-0' : 'pt-20'} flex-grow`}>
        <Routes>
          {/* ================= CLIENT ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice" element={<PracticeArea />} />
          <Route path="/team" element={<Team />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout>
                  <BlogManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blogs/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout>
                  <CreateBlog />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer hanya muncul di client */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  useEffect(() => {
    // Tes koneksi backend (optional)
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => console.log("Backend:", data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;