import { ArrowRight, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

interface StepTimeProps {
  timeSlots: string[];
  selectedDate: string;

  selectedTime: string;
  setSelectedTime: (time: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}
const TimeSelection = ({
  timeSlots,
  selectedDate,
  selectedTime,
  setSelectedTime,
  nextStep,
  prevStep,
}: StepTimeProps) => {
  const { data: bookedTimes = [] } = useQuery({
    queryKey: ["bookedTimes", selectedDate],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/appointments/booked/${selectedDate}`
        );
        return res.data as string[];
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error("Saatler alınamadı: " + err.message);
          throw err; // Hata yine throw edilirse TanStack Query isError çalışır
        }
        toast.error("Saatler alınamadı: Bilinmeyen bir hata");
        throw new Error("Unknown error fetching booked times");
      }
    },
    enabled: !!selectedDate,
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold"> Saat Seçimi</h2>
        <p className="text-gray-600">Uygun saati seçin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {timeSlots.map((time) => {
          const isBooked = bookedTimes.includes(time);

          return (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={isBooked}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 font-semibold text-sm
        ${
          selectedTime === time
            ? "bg-green-700 text-white border-green-700 hover:bg-green-800"
            : isBooked
            ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:text-green-700"
        }`}
            >
              <Clock className="h-4 w-4 " />
              {time}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between ">
        <button
          onClick={prevStep}
          className=" flex items-center justify-center bg-gray-100 border border-gray-300 px-4 py-2 hover:bg-gray-200 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
        >
          <span className="font-semibold">Geri</span>
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedTime}
          className="flex items-center justify-center bg-green-700 hover:bg-green-800 px-6 py-3 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
        >
          <span className="text-white font-semibold">Devam Et</span>
          <ArrowRight className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TimeSelection;
