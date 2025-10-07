import { useState } from "react";
import { Tag } from "lucide-react";
import BlogDetailsCard from "../components/blogpage/BlogDetailsCard";
import Banner from "../components/layout/Banner";
import useBlogs from "../hooks/useBlogs";
import useBlogCategories from "../hooks/useBlogCategories";

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

const BlogsPage = () => {
  const { data: blogs = [], isLoading } = useBlogs();
  const { data: categories = [] } = useBlogCategories();
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const filteredBlogs =
    activeCategory === "Tümü"
      ? blogs
      : blogs.filter((b: BlogProps) => {
          const categoryId =
            typeof b.category === "object" ? b.category._id : b.category;
          return categoryId === activeCategory;
        });
  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <Banner
        image="/depresyon-banner.jpg"
        title="Blog & Makaleler"
        description="Ruh sağlığı, kişisel gelişim ve yaşam kalitesi hakkında uzmanlarımızdan faydalı bilgiler, pratik öneriler ve güncel araştırmalar."
      />

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-3 p-4 rounded-lg">
            <button
              key="all"
              onClick={() => setActiveCategory("Tümü")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow transition font-semibold
      ${
        activeCategory === "Tümü"
          ? "bg-green-700 text-white border-green-700"
          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
      }`}
            >
              <Tag className="w-4 h-4" />
              <span>Tümü</span>
            </button>
            {categories.map((category: CategoryProps | string) => {
              const categoryId =
                typeof category === "object" ? category._id : category;

              return (
                <button
                  key={categoryId}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow transition font-semibold
        ${
          activeCategory === categoryId
            ? "bg-green-700 text-white border-green-700"
            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
        }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>
                    {typeof category === "object" ? category.name : category}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="py-10">
            <h2 className="text-center text-3xl font-bold mb-8">
              Tüm Makaleler
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog: BlogProps) => (
                  <BlogDetailsCard
                    key={blog._id}
                    title={blog.title}
                    description={blog.summary}
                    image={blog.image}
                    category={
                      typeof blog.category === "object"
                        ? blog.category.name
                        : blog.category
                    }
                    author={blog.author}
                    readTime={
                      blog.readTime ? `${blog.readTime} dk` : "Tahmini süre yok"
                    }
                    date={
                      blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("tr-TR")
                        : ""
                    }
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  Henüz makale bulunmamaktadır.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
