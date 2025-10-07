import { useState, useEffect } from "react";
import ServiceCard from "./cards/ServiceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useServices from "../../hooks/useServices";

interface ServiceProps {
  _id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  duration: string;
}
const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const { data: services = [] } = useServices();

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // mobil
      } else {
        setItemsPerPage(3); // tablet & desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(services.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= services.length ? 0 : prev + itemsPerPage
    );
  };
  const visibleServices = services.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-center mb-10 text-3xl lg:text-4xl font-bold">
          Hizmetlerimiz
        </h1>
        <div className="relative">
          {/* Desktop grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {visibleServices.map((service: ServiceProps) => (
              <ServiceCard
                key={service._id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="bg-green-700 rounded-full text-slate-200 p-2 hover:bg-green-600 hover:text-slate-100"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="bg-green-700 rounded-full text-slate-200 p-2 hover:bg-green-600 hover:text-slate-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
