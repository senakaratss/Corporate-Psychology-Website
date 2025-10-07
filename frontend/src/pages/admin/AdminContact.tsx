import { Facebook, Globe, Instagram, Phone, Save, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useContacts } from "../../hooks/useContact";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import axios from "axios";

const AdminContact = () => {
  const queryClient = useQueryClient();
  const { data: contact, isLoading } = useContacts();
  const [contactInfo, setContactInfo] = useState({
    companyName: "",
    website: "",
    email: "",
    phone: "",
    tel: "",
    workingHours: "",
    address: "",
    companyDescription: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const { mutate: editContact, isPending: loading } = useMutation({
    mutationFn: async (newContact: typeof contactInfo) => {
      const res = await axiosInstance.post("/contact", newContact);
      return res.data;
    },

    onSuccess: () => {
      toast.success("İletişim bilgileri başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "İletişim bilgileri güncellenirken bir sorun oluştı"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });
  useEffect(() => {
    if (contact) {
      setContactInfo(contact);
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editContact(contactInfo);
  };
  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">İletişim Bilgileri</h1>
        <p className="text-gray-600">Şirket iletişim bilgilerini yönet</p>
      </div>
      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="text-sky-500 " />
            <h3 className="font-medium text-2xl">İletişim Bilgileri</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Şirket Adı
                </label>
                <input
                  value={contactInfo.companyName}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Website</label>
                <input
                  value={contactInfo.website}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold">E-posta</label>
                <input
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Telefon</label>
                <input
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Cep Telefonu
                </label>
                <input
                  value={contactInfo.tel}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      tel: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Çalışma Saatleri
                </label>
                <input
                  value={contactInfo.workingHours}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      workingHours: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Adres</label>
              <textarea
                id="address"
                value={contactInfo.address}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Şirket Açıklaması
              </label>
              <textarea
                id="description"
                value={contactInfo.companyDescription}
                onChange={(e) =>
                  setContactInfo((prev) => ({
                    ...prev,
                    companyDescription: e.target.value,
                  }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-sky-500 w-5 h-5" />
            <h3 className="font-medium text-2xl">Sosyal Medya Hesapları</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="instagram"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </label>
                <input
                  id="instagram"
                  value={contactInfo.instagram}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                  placeholder="@kullaniciadi"
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="facebook"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </label>
                <input
                  id="facebook"
                  placeholder="kullaniciadi"
                  value={contactInfo.facebook}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      facebook: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="twitter"
                  className="flex items-center gap-2  text-sm font-semibold"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </label>
                <input
                  id="twitter"
                  placeholder="@kullaniciadi"
                  value={contactInfo.twitter}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      twitter: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
