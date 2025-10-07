import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Lock, Eye, EyeOff, Shield, User } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate: login, isPending: loading } = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Başarıyla giriş yapıldı");
      navigate("/admin");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Giriş yapılamadı");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-16 h-16 mx-auto bg-green-700 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Admin Paneli</h1>
          <p className="text-gray-700">Yönetici hesabınızla giriş yapın</p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200 space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">Giriş Yap</h2>
            <p className="text-gray-600">
              Admin paneline erişim için bilgilerinizi girin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-700" />
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-700 hover:text-gray-900"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center mt-2">
            <a
              href="/"
              className="text-sm text-green-700 hover:text-green-900 transition-colors"
            >
              ← Ana sayfaya dön
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-700">
          Bu sayfa sadece yetkili personel içindir
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
