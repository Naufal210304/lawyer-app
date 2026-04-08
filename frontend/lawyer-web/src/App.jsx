import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

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
import TeamManagement from "./pages/admin/Team";
import ConsultationManagement from "./pages/admin/Consultation";
import ReportManagement from "./pages/admin/Report";
import PartnerManagement from "./pages/admin/Partners";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import PracticeAreaManagement from "./pages/admin/PracticeArea";
import SettingsManagement from "./pages/admin/Settings";

// AUTH
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layout/Layout";

// 🔥 GlobalWrapper (Rename dari Layout untuk menghindari konflik dengan AdminLayout)
const AppContent = () => {
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

          {/* Admin Redirections */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/consultations"
            element={<Navigate to="/admin/consultations/pending" replace />}
          />

          {/* Main Admin Pages */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><Dashboard /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/consultations/pending"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><ConsultationManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/consultations/report"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><ReportManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/practice"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><PracticeAreaManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><PartnerManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><TeamManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><BlogManagement /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><CreateBlog /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout><EditBlog /></AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminLayout>
                  <SettingsManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Catch All - Redirect ke Home atau Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
      <AppContent />
    </Router>
  );
}

export default App;