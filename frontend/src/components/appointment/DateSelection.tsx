import { ArrowRight, Calendar } from "lucide-react";

interface StepDateProps {
  availableDates: { date: string; day: string }[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}
const DateSelection = ({
  availableDates,
  selectedDate,
  setSelectedDate,
  nextStep,
  prevStep,
}: StepDateProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Tarih Seçimi</h2>
        <p className="text-gray-600">Size uygun tarihi seçin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {availableDates.map((dateInfo) => (
          <div
            key={dateInfo.date}
            className={`rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              selectedDate === dateInfo.date
                ? "border-green-700 bg-green-700/10"
                : "border-gray-300 hover:border-green-700"
            }`}
            onClick={() => setSelectedDate(dateInfo.date)}
          >
            <div className="flex flex-col items-center justify-center gap-1 p-4">
              <Calendar className="h-6 w-6 text-green-700 " />
              <span className="font-semibold text-sm">{dateInfo.day}</span>

              <span className="text-gray-600 text-xs">
                {new Date(dateInfo.date).getDate()}/
                {new Date(dateInfo.date).getMonth() + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between ">
        <button
          onClick={prevStep}
          className="flex items-center justify-center bg-gray-100 border border-gray-300 px-4 py-2 hover:bg-gray-200 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
        >
          <span className="font-semibold">Geri</span>
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedDate}
          className="flex items-center justify-center bg-green-700 hover:bg-green-800 px-6 py-3 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
        >
          <span className="text-white font-semibold">Devam Et</span>
          <ArrowRight className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default DateSelection;
