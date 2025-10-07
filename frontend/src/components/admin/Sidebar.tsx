import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  Brain,
  ChevronLeft,
  Menu,
  MessageCircle,
  Briefcase,
  Phone,
  LogOut,
  X,
  Info,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

// Navigasyon menüsü
const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Randevular", href: "/admin/appointments", icon: Calendar },
  { name: "Mesajlar", href: "/admin/messages", icon: MessageCircle },
  { name: "Hizmetler", href: "/admin/services", icon: Briefcase },
  { name: "Blog", href: "/admin/blogs", icon: FileText },
  { name: "Hakkımızda", href: "/admin/about", icon: Info },
  { name: "İletişim", href: "/admin/contact", icon: Phone },
  { name: "Ayarlar", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const Sidebar = ({ onNavigate, onClose, isMobile }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = !isMobile;

  // Logout işlemi
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Başarıyla çıkış yapıldı");
      navigate("/login");
    },
    onError: (err: unknown) => {
      toast.error(
        err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu"
      );
    },
  });

  return (
    <div
      className={`flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        isDesktop && collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed || !isDesktop ? (
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-sky-600" />
            <h1 className="text-xl font-semibold text-gray-800">WebAdmin</h1>
          </div>
        ) : null}

        {/* Desktop collapse button */}
        {isDesktop && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100"
          >
            {collapsed ? (
              <Menu className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
                ${
                  isDesktop && collapsed
                    ? "p-2 justify-center"
                    : "gap-3 px-3 py-2.5 justify-start"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {(!collapsed || !isDesktop) && (
                <span className="font-medium">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex items-center gap-3 ${
            isDesktop && collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-semibold">
            A
          </div>
          {(!collapsed || !isDesktop) && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Yönetici</p>
            </div>
          )}
          {(!collapsed || !isDesktop) && (
            <button
              onClick={() => logout()}
              className="p-2 rounded hover:bg-red-100 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
