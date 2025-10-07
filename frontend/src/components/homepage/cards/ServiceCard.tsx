import * as LucideIcons from "lucide-react"; // tüm iconları import
interface ServiceCardProps {
  title: string;
  icon: React.ElementType;
  description: string;
}
const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const Icon = (LucideIcons[icon as keyof typeof LucideIcons] ||
    LucideIcons.Brain) as React.ElementType;
  return (
    <div className="group relative min-h-[200px] flex flex-col items-center justify-start bg-white p-6 rounded-lg shadow pt-10 hover:shadow-lg transition-shadow duration-300">
      <div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 border border-gray-200 bg-gray-200/80 p-4 rounded-full flex items-center justify-center shadow-lg text-green-700
      group-hover:bg-green-700 group-hover:scale-110 group-hover:text-white
                      transition-all duration-300"
      >
        <Icon />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className=" overflow-hidden line-clamp-3 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
