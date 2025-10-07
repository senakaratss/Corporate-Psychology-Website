import * as LucideIcons from "lucide-react"; // tüm iconları import
import { Clock, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
interface ServiceCardDetailsProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  duration: string;
}
const ServiceDetailCard = ({
  icon,
  title,
  description,
  features,
  duration,
}: ServiceCardDetailsProps) => {
  const Icon = (LucideIcons[icon as keyof typeof LucideIcons] ||
    LucideIcons.Brain) as React.ElementType;
  return (
    <div className="group flex flex-col h-full bg-white shadow rounded-lg hover:shadow-lg transition-all duration-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex space-x-8">
          <div
            className="flex items-center justify-center w-16 h-16 bg-gray-200/80 p-4 rounded-full shadow-lg text-green-700
      group-hover:bg-green-700 group-hover:scale-110 group-hover:text-white
                      transition-all duration-300"
          >
            <Icon size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold mb-2"> {title}</span>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <h4 className="font-semibold mb-2">Kapsadığı Alanlar:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Star className="w-3 h-3 text-green-700" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">{duration}</span>
          </div>
          <Link to={"/appointment"}>
            <button className="border border-gray-200 bg-gray-50 rounded-lg p-2 cursor-pointer font-semibold text-sm hover:text-green-700 hover:bg-gray-100">
              Randevu Al
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailCard;
