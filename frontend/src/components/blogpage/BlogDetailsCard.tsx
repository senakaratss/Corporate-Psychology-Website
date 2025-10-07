import { BookOpen, Clock, User } from "lucide-react";

import { Link } from "react-router";
interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
  date: string;
}
const BlogCard = ({
  title,
  description,
  author,
  category,
  readTime,
  image,
  date,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col group bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300">
      {/* Resim */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl shadow group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>
      {/* İçerik */}
      <div className="flex flex-col flex-1 justify-between p-4 space-y-3">
        {/* Başlık & Açıklama */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Yazar & Süre */}
        <div className="flex items-center justify-between text-gray-600 text-xs">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Tarih & Oku Butonu */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{date}</span>
          <div className="flex items-center gap-2">
            <Link
              to={"/blogs"}
              className="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:text-green-700 hover:bg-gray-100 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-semibold text-sm">Oku</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
