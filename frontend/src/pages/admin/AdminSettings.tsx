import { Shield } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AdminSettings = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: updatePassword, isPending: loading } = useMutation({
    mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
      const res = await axiosInstance.put("/auth/update-password", data);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Şifre başarıyla güncellendi");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await axiosInstance.post("/auth/logout");
      navigate("/login");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Bir hata oluştu");
      } else {
        toast.error("Bir hata oluştu");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return alert("Yeni şifreler eşleşmiyor");
    }

    updatePassword({ oldPassword, newPassword });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-gray-600">Hesap ve uygulama ayarlarını yönet</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="text-sky-500 w-6 h-6" />
            <h2 className="text-2xl font-semibold">Güvenlik</h2>
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Mevcut Şifre</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Yeni Şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              autoComplete="new-password"
            />
          </div>{" "}
          <div className="space-y-2">
            <label className="block font-semibold">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white 
          px-3 py-2 rounded-lg font-semibold"
          >
            {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
