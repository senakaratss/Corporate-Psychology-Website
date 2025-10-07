import { ArrowLeft, Save, Image } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useBlogCategories from "../../hooks/useBlogCategories";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const AdminBlogAdd = () => {
  const navigate = useNavigate();
  const { data: categories = [] } = useBlogCategories();
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
    readTime: 0,
    image: "",
    content: "",
  });
  const [preview, setPreview] = useState("");

  const { mutate: addBlog, isPending: loading } = useMutation({
    mutationFn: async (newBlog: typeof blogData) => {
      const res = await axiosInstance.post("/blogs", newBlog);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog başarıyla eklendi");
      navigate("/admin/blogs"); // Başarılı → listeye dön
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData((prev) => ({ ...prev, image: reader.result as string }));
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBlog(blogData);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/blogs")}
          className="p-2 hover:text-white hover:bg-sky-500 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">Yeni Blog Ekle</h1>
          <p className="text-gray-600">Sunduğunuz blogları detaylandırın</p>
        </div>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">Temel Bilgiler</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Başlık *</label>
              <input
                value={blogData.title}
                onChange={(e) =>
                  setBlogData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Örn: Anksiyete ile Başa Çıkma Yöntemleri"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Özet *</label>
              <textarea
                value={blogData.summary}
                onChange={(e) =>
                  setBlogData((prev) => ({ ...prev, summary: e.target.value }))
                }
                rows={2}
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Yazının kısa özeti (2-3 cümle)"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Kategori *
                </label>
                <select
                  id="category"
                  value={blogData.category}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((category: { _id: string; name: string }) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Okuma Süresi
                </label>
                <input
                  value={blogData.readTime}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      readTime: Number(e.target.value),
                    }))
                  }
                  type="number"
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                  placeholder="Örn: 5"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Yazar *</label>
              <input
                value={blogData.author}
                onChange={(e) =>
                  setBlogData((prev) => ({ ...prev, author: e.target.value }))
                }
                className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                placeholder="Örn: Sena Karataş"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">İçerik</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Öne Çıkan Görsel *
              </label>

              <div className="flex items-center gap-2">
                <input
                  id="featuredImage"
                  value={blogData.image}
                  onChange={(e) =>
                    setBlogData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="https://..."
                  className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
                />

                {/* Görsel yükleme butonu */}
                <label
                  htmlFor="uploadImage"
                  className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  <Image className="w-4 h-4" />
                  Yükle
                </label>

                <input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Görsel önizleme */}
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Önizleme"
                    className="w-64 h-40 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Blog İçeriği *
              </label>
              <textarea
                id="content"
                value={blogData.content}
                onChange={(e) =>
                  setBlogData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Blog yazısının tam içeriğini buraya yazın..."
                className="w-full min-h-[300px] px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={() => navigate("/admin/blogs")}
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
  );
};

export default AdminBlogAdd;
