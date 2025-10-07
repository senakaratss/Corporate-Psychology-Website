import useBlogs from "../../hooks/useBlogs";
import BlogDetailsPage from "../blogpage/BlogDetailsCard";

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
const Blogs = () => {
  const { data: blogs = [], isLoading } = useBlogs();
  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10">
          Updated Blog & News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog: BlogProps) => (
            <BlogDetailsPage
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
