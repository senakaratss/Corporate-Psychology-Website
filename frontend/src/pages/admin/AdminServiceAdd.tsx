import axios from "axios";
import { ArrowLeft, Plus, Save } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

const AdminServiceAdd = () => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    icon: "",
    duration: "",
    features: [] as string[],
  });
  const [featureInput, setFeatureInput] = useState("");
  const navigate = useNavigate();

  const addFeature = () => {
    if (featureInput.trim() === "") return;
    setServiceData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setServiceData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const { mutate: addService, isPending: loading } = useMutation({
    mutationFn: async (newService: typeof serviceData) => {
      const res = await axiosInstance.post("/services", newService);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Hizmet başarıyla eklendi");
      navigate("/admin/services");
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
    addService(serviceData);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/services")}
          className="p-2 hover:text-white hover:bg-sky-500 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">Yeni Hizmet Ekle</h1>
          <p className="text-gray-600">
            Sunduğunuz hizmetlerinizi detaylandırın
          </p>
        </div>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">Temel Bilgiler</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Hizmet Adı *
              </label>
              <input
                value={serviceData.title}
                onChange={(e) =>
                  setServiceData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Örn: Bireysel Psikoterapi"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold">İkon *</label>
              <input
                value={serviceData.icon}
                onChange={(e) =>
                  setServiceData((prev) => ({ ...prev, icon: e.target.value }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Örn: Brain"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Kısa Açıklama *
              </label>
              <textarea
                rows={2}
                value={serviceData.shortDescription}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    shortDescription: e.target.value,
                  }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Hizmetin kısa açıklaması (1-2 cümle)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Detaylı Açıklama *
              </label>
              <textarea
                rows={5}
                value={serviceData.description}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Hizmetin detaylı açıklaması, ne tür sorunlara yardımcı olduğu, kullanılan yöntemler..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Seans Süresi
              </label>
              <input
                value={serviceData.duration}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Örn: 50 dakika"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">Hizmet Özellikleri</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="w-full px-2 py-2 bg-gray-100 border border-gray-200 rounded-xl"
                placeholder="Örn: EMDR Terapisi, CBT Yaklaşımı..."
              />
              <button
                onClick={addFeature}
                className="flex items-center justify-center p-3 rounded-xl bg-sky-500 text-white hover:bg-sky-400"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {serviceData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {serviceData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={() => navigate("/admin/services")}
            className="bg-white px-3 py-2 border border-gray-300 rounded-lg font-semibold cursor-pointer"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold"
          >
            <Save className="w-4 h-4" />
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceAdd;
