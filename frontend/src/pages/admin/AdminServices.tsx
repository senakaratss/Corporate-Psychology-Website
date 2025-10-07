import * as LucideIcons from "lucide-react"; // tüm iconları import
import { Clock, Edit, Eye, Search, Trash2, Plus } from "lucide-react";

import React, { useState } from "react";
import { useNavigate } from "react-router";
import useServices from "../../hooks/useServices";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";
interface ServiceProps {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  duration: string;
  features: string[];
}
const AdminServices = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const { data: services = [], isLoading } = useServices();

  const filteredServices = services.filter((service: ServiceProps) => {
    const search = searchTerm.toLowerCase();

    const matchTitle = service.title.toLowerCase().includes(search);

    const matchFeatures = service.features.some((feature) =>
      feature.toLowerCase().includes(search)
    );

    return matchTitle || matchFeatures;
  });

  const { mutate: deleteService, isPending: loadingDelete } = useMutation({
    mutationFn: async (serviceId: string) => {
      const res = await axiosInstance.delete(`/services/${serviceId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Hizmet başarıyla silindi");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Silme işlemi başarısız");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });

  const handleDelete = (serviceId: string) => {
    deleteService(serviceId);
  };

  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold ">Hizmetler</h1>
          <p className="text-gray-600">Sunduğunuz hizmetleri yönetin</p>
        </div>
        <button
          onClick={() => navigate("/admin/add-service")}
          className="flex items-center justify-center gap-1 w-40  cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          Yeni Hizmet
        </button>
      </div>
      <div className="relative">
        <Search className="absolute inset-y-0 left-2 w-4 h-4 my-auto text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hizmet veya özellik ara..."
          className="pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full lg:w-96"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {searchTerm && filteredServices.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            “{searchTerm}” için sonuç bulunamadı.
          </p>
        ) : services.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Henüz hizmet eklenmemiş.
          </p>
        ) : (
          filteredServices.map((service: ServiceProps) => {
            const Icon = (LucideIcons[
              service.icon as keyof typeof LucideIcons
            ] || LucideIcons.Brain) as React.ElementType;

            return (
              <div
                key={service._id}
                className="flex flex-col gap-2 bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <Icon />
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-sm text-gray-600">Süre</span>
                  </div>

                  <span className="font-semibold text-sm text-green-600">
                    {service.duration}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Özellikler</span>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {service.features?.map((feature) => (
                      <button
                        key={feature}
                        className="flex items-center bg-gray-50 py-1 px-2 gap-2 rounded-2xl text-xs font-semibold"
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/services/${service._id.toString()}`)
                    }
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-sky-600 border border-sky-600 rounded-xl hover:bg-sky-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Görüntüle
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/edit-service/${service._id}`)
                    }
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </button>

                  <button
                    onClick={() => handleDelete(service._id)}
                    disabled={loadingDelete}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-red-600  rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminServices;
