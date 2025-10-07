import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Banner from "../components/layout/Banner";
import ServiceSelection from "../components/appointment/ServiceSelection";
import DateSelection from "../components/appointment/DateSelection";
import TimeSelection from "../components/appointment/TimeSelection";
import ContactStep from "../components/appointment/ContactStep";
import useServices from "../hooks/useServices";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const availableDates: { date: string; day: string }[] = [];
let i = 0;

while (availableDates.length < 12) {
  const d = new Date();
  d.setDate(d.getDate() + i);

  const dayOfWeek = d.getDay(); // 0 = Pazar
  if (dayOfWeek !== 0) {
    // Pazar değilse ekle
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    availableDates.push({
      date: `${year}-${month}-${day}`,
      day: d.toLocaleDateString("tr-TR", { weekday: "long" }),
    });
  }
  i++;
}

const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false); // ✅ yeni state

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const { data: services = [] } = useServices();

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  const handleConfirm = () => {
    setIsConfirmed(true); // ✅ onaylandı
  };
  return (
    <div>
      <Banner
        image="/depresyon-banner.jpg"
        title="Randevu Al"
        description="Ruh sağlığınız için ilk adımı atmak için randevunuzu kolayca
            planlayabilirsiniz. Size en uygun tarih ve saati birlikte
            belirleyelim."
      />

      {/* Progress Steps */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    i <= step
                      ? "bg-green-700 text-white"
                      : "bg-gray-200/70 text-gray-600"
                  }`}
                >
                  {i < step ? <CheckCircle className="h-5 w-5" /> : i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      i < step ? "bg-green-700" : "bg-gray-200/70"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-10 shadow-2xl shadow-gray-400">
            {/* ✅ Eğer onaylandıysa, sadece başarı mesajını göster */}
            {isConfirmed ? (
              <div className="text-center space-y-4 py-20">
                <CheckCircle className="mx-auto h-16 w-16 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Randevunuz Başarıyla Oluşturuldu!
                </h2>
                <p className="text-gray-600">
                  Size en kısa sürede dönüş yapılacaktır. Teşekkür ederiz 🌿
                </p>
              </div>
            ) : (
              <>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <ServiceSelection
                    services={services}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    nextStep={nextStep}
                  />
                )}

                {/* Step 2: Date Selection */}
                {step === 2 && (
                  <DateSelection
                    availableDates={availableDates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}

                {/* Step 3: Time Selection */}
                {step === 3 && (
                  <TimeSelection
                    timeSlots={timeSlots}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}

                {/* Step 4: Contact Information */}

                {step === 4 && (
                  <ContactStep
                    services={services}
                    selectedService={selectedService}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    prevStep={prevStep}
                    handleConfirm={handleConfirm}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;
