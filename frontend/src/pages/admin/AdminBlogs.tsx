import {
  Calendar,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useBlogCategories from "../../hooks/useBlogCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "../../lib/axios";
import useBlogs from "../../hooks/useBlogs";
interface CategoryProps {
  _id: string;
  name: string;
}
interface BlogProps {
  _id: string; // MongoDB ObjectId
  category: CategoryProps | string; // populate edilirse Category objesi de olabilir
  title: string;
  summary: string;
  content: string;
  author: string;
  readTime?: number;
  image: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
const AdminBlogs = () => {
  const [featureInput, setFeatureInput] = useState("");
  const { data: categories = [] } = useBlogCategories();
  const { data: blogs = [], isLoading } = useBlogs();

  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((blog: BlogProps) => {
    // Kategori filtresi
    const categoryMatch =
      selectedCategory === "Tümü"
        ? true
        : typeof blog.category === "object"
        ? blog.category._id === selectedCategory
        : blog.category === selectedCategory;

    // Arama filtresi
    const search = searchTerm.toLowerCase();
    const searchMatch =
      blog.title.toLowerCase().includes(search) ||
      blog.author.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: addCategory, isPending: Addloading } = useMutation({
    mutationFn: async (newCategory: { name: string }) => {
      const res = await axiosInstance.post("/categories", newCategory);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Kategori başarıyla eklendi");
      setFeatureInput("");
      //kategori eklendikten sonra kategorileri yenile
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Kategori eklenemedi");
      } else {
        toast.error("Bir hata oluştu");
      }
    },
  });
  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (categoryId: string) => {
      const res = await axiosInstance.delete(`/categories/${categoryId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Kategori başarıyla silindi");
      //kategori eklendikten sonra kategorileri yenile
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Kategori silinemedi");
      } else {
        toast.error("Bir hata oluştu");
      }
    },
  });
  const { mutate: deleteBlog, isPending: loading } = useMutation({
    mutationFn: async (blogId: string) => {
      const res = await axiosInstance.delete(`/blogs/${blogId}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Blog başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Blog silinirken bir sorun oluştu"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });
  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold ">Blog Yönetimi</h1>
          <p className="text-gray-600">Blog yazılarını oluştur ve yönet</p>
        </div>

        <Link to={`/admin/add-blog`}>
          <button className="flex items-center justify-center gap-1 w-40  cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold">
            <Plus className="w-5 h-5" />
            <span>Yeni Yazı</span>
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg">
            <Tag className="w-5 h-5" />
            <span className="font-medium"> Kategori Yönetimi</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Yeni kategori ekle"
              className="w-full px-2 py-2 bg-gray-100 border border-gray-200 rounded-xl"
            />
            <button
              onClick={() => {
                if (!featureInput.trim()) {
                  toast.error("Kategori adı boş olamaz");
                  return;
                }
                addCategory({ name: featureInput });
              }}
              disabled={Addloading}
              className="flex items-center justify-center p-3 rounded-xl bg-sky-500 text-white hover:bg-sky-400"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category: CategoryProps) => (
                <span
                  key={category._id}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {category.name}
                  <button
                    type="button"
                    onClick={() => deleteCategory(category._id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none " />
              <input
                type="text"
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                className={`px-3 py-1 border border-gray-300 rounded-xl cursor-pointer
      ${
        selectedCategory === "Tümü"
          ? "bg-sky-500 text-white"
          : "hover:bg-sky-500 hover:text-white"
      }`}
                key={"tümü"}
                onClick={() => setSelectedCategory("Tümü")}
              >
                <span className="font-medium text-sm">Tümü</span>
              </button>
              {categories.map((category: CategoryProps) => (
                <button
                  className={`px-2 py-1 border border-gray-300 rounded-xl cursor-pointer transition-colors duration-300
        ${
          selectedCategory === category._id
            ? "bg-sky-500 text-white"
            : "hover:bg-sky-500 hover:text-white"
        }`}
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <span className="font-medium text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredBlogs.length === 0 ? (
              searchTerm ? (
                <p className="text-gray-500 text-center py-6">
                  "{searchTerm}" için sonuç bulunamadı.
                </p>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Henüz blog bulunmamaktadır.
                </p>
              )
            ) : (
              filteredBlogs.map((blog: BlogProps) => {
                const Icon = FileText;

                return (
                  <div
                    key={blog._id}
                    className="flex flex-col gap-2 bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {blog.title}
                      </h3>
                      <Icon className="w-6 h-6 text-sky-500" />
                    </div>
                    <span className="self-start inline-block text-xs font-bold px-3 py-1 rounded-full border border-gray-300">
                      {blog.category &&
                      typeof blog.category === "object" &&
                      "name" in blog.category
                        ? blog.category.name
                        : typeof blog.category === "string"
                        ? blog.category
                        : "Kategori Yok"}
                    </span>
                    <p className="text-sm text-gray-600">{blog.summary}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>
                        <span>
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : "20.01.2024"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 text-xs ">
                      <span>Yazar: {blog.author}</span>
                      <span>
                        Okuma süresi:{" "}
                        {blog.readTime
                          ? `${blog.readTime} dk`
                          : "Tahmini süre yok"}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/blogs/${blog._id.toString()}`)
                        }
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-sky-600 border border-sky-600 rounded-xl hover:bg-sky-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Görüntüle
                      </button>

                      <button
                        onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Düzenle
                      </button>

                      <button
                        onClick={() => deleteBlog(blog._id)}
                        disabled={loading}
                        className="ml-auto flex items-center justify-center gap-1 px-3 py-2 text-sm font-semibold text-red-600  rounded-xl hover:bg-red-50 transition-colors"
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
      </div>
    </div>
  );
};

export default AdminBlogs;
