import { ArrowRight } from "lucide-react";

interface StepServiceProps {
  services: {
    _id: string;
    title: string;
    duration: string;
    description: string;
    shortDescription: string;
  }[];
  selectedService: string;
  setSelectedService: (id: string) => void;
  nextStep: () => void;
}

const StepService = ({
  services,
  selectedService,
  setSelectedService,
  nextStep,
}: StepServiceProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Hizmet Seçimi</h2>
        <p className="text-gray-600">
          Hangi hizmetimizden faydalanmak istiyorsunuz?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className={`rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              selectedService === service._id
                ? "border-green-700 bg-green-700/10"
                : "border-gray-300 hover:border-green-700"
            }`}
            onClick={() => setSelectedService(service._id)}
          >
            <div className="flex flex-col space-y-2 p-6">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold">{service.title}</h1>
                <span className="text-sm text-gray-600">
                  {service.duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {service.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end ">
        <button
          onClick={nextStep}
          disabled={!selectedService}
          className="flex items-center justify-center bg-green-700 hover:bg-green-800 px-6 py-3 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
        >
          <span className="text-white font-semibold">Devam Et</span>
          <ArrowRight className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default StepService;
