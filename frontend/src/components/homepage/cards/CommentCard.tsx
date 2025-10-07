import { Quote, Star } from "lucide-react";
interface CommentCardProps {
  name: string;
  comment: string;
  image: string;
  rating: number;
}
const CommentCard = ({ name, comment, image, rating }: CommentCardProps) => {
  return (
    <div className="relative min-h-[220px] flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg  transition-shadow duration-300">
      <div className="absolute -top-6 p-4 bg-green-700 rounded-full text-white  shadow-lg">
        <Quote />
      </div>
      <div className="space-y-6 text-center mt-6">
        <p className="font-semibold text-gray-900 leading-relaxed">
          "{comment}"
        </p>
        <div className="flex items-center justify-center gap-6">
          <img src={image} alt={name} className="size-15 rounded-full" />
          <div className="flex flex-col gap-2">
            <span>{name}</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  color={i < rating ? "#ffe234" : "gray"}
                  fill={i < rating ? "#ffe234" : "none"}
                  size={18}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
