import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import BlogsPage from "./pages/BlogsPage";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/admin/LoginPage";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminServices from "./pages/admin/AdminServices";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminServiceAdd from "./pages/admin/AdminServiceAdd";
import AdminServiceView from "./pages/admin/AdminServiceView";
import AdminServiceEdit from "./pages/admin/AdminServiceEdit";
import AdminBlogView from "./pages/admin/AdminBlogView";
import AdminBlogAdd from "./pages/admin/AdminBlogAdd";
import AdminBlogEdit from "./pages/admin/AdminBlogEdit";
import AdminContact from "./pages/admin/AdminContact";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAbout from "./pages/admin/AdminAbout";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* müşteri sayfaları */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <PublicLayout>
              <BlogsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/appointment"
          element={
            <PublicLayout>
              <AppointmentPage />
            </PublicLayout>
          }
        />

        {/* admin login */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="add-service" element={<AdminServiceAdd />} />
          <Route path="services/:id" element={<AdminServiceView />} />
          <Route path="edit-service/:id" element={<AdminServiceEdit />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="add-blog" element={<AdminBlogAdd />} />
          <Route path="blogs/:id" element={<AdminBlogView />} />
          <Route path="edit-blog/:id" element={<AdminBlogEdit />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
