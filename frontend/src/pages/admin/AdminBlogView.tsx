import React from "react";
import { Link, useParams } from "react-router";
import { useBlog } from "../../hooks/useBlog";
import { ArrowLeft, Calendar, Clock, Edit, User } from "lucide-react";

const AdminBlogView = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useBlog(id);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!blog) return <p>Blog bulunamadı</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to={"/admin/blogs"}>
            <button className="p-2 hover:text-white hover:bg-sky-500 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold ">Blog Yazısı</h1>
            <p className="text-gray-600">Detaylı görünüm</p>
          </div>
        </div>

        <Link to={`/admin/edit-blog/${id}`}>
          <button className="flex items-center justify-center gap-1 w-40  cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold">
            <Edit className="w-5 h-5" />
            Düzenle
          </button>
        </Link>
      </div>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {blog.image && (
          <div className="rounded-2xl shadow-sm overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              loading="lazy"
              className="w-full h-auto max-h-[300px] rounded-xl object-contain bg-gray-100"
              style={{ imageRendering: "auto" }}
            />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <span className="self-start inline-block text-xs font-bold px-3 py-1 rounded-full border border-gray-300">
              {blog.category &&
              typeof blog.category === "object" &&
              "name" in blog.category
                ? blog.category.name
                : typeof blog.category === "string"
                ? blog.category
                : "Kategori Yok"}
            </span>
            <h3 className="text-4xl font-medium">{blog.title}</h3>
            <p className="text-lg text-gray-700">{blog.summary}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2 text-gray-500 border-t border-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {blog.readTime
                    ? `${blog.readTime} dakika`
                    : "Tahmini süre yok"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* Blog içeriğini HTML olarak render et */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBlogView;
