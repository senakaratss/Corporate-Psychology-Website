import { Calendar, Mail, Phone, Search } from "lucide-react";
import useAppointments from "../../hooks/useAppointments";
import { useState } from "react";
import useServices from "../../hooks/useServices";

interface AppointmentProps {
  _id: string;
  service: { _id: string; title: string; duration: string };
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  note?: string;
}
interface ServiceProps {
  _id: string;
  title: string;
}
const AppointmentPage = () => {
  const { data: appointments = [], isLoading } = useAppointments();
  const { data: services = [] } = useServices();

  const [selectedService, setSelectedService] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(
    (appointment: AppointmentProps) => {
      // Kategori filtresi
      const serviceMatch =
        selectedService === "Tümü"
          ? true
          : typeof appointment.service === "object"
          ? appointment.service._id === selectedService
          : appointment.service === selectedService;

      // Arama filtresi
      const search = searchTerm.toLowerCase();
      const searchMatch = appointment.fullName.toLowerCase().includes(search);

      return serviceMatch && searchMatch;
    }
  );

  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold ">Randevu Talepleri</h1>
        <p className="text-gray-600">Gelen randevu taleplerini yönet</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none " />
          <input
            type="text"
            placeholder="Randevu ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-1 border border-gray-300 rounded-xl cursor-pointer
      ${
        selectedService === "Tümü"
          ? "bg-sky-500 text-white"
          : "hover:bg-sky-500 hover:text-white"
      }`}
            key={"tümü"}
            onClick={() => setSelectedService("Tümü")}
          >
            <span className="font-medium text-sm">Tümü</span>
          </button>
          {services.map((service: ServiceProps) => (
            <button
              className={`px-2 py-1 border border-gray-300 rounded-xl cursor-pointer transition-colors duration-300
        ${
          selectedService === service._id
            ? "bg-sky-500 text-white"
            : "hover:bg-sky-500 hover:text-white"
        }`}
              key={service._id}
              onClick={() => setSelectedService(service._id)}
            >
              <span className="font-medium text-sm">{service.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-4">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Henüz randevu bulunmamaktadır.
          </p>
        ) : (
          filteredAppointments.map((appointment: AppointmentProps) => {
            const formattedDate = new Date(appointment.date).toLocaleDateString(
              "tr-TR",
              { day: "2-digit", month: "2-digit" }
            );

            return (
              <div
                key={appointment._id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-300 transition-all duration-300"
              >
                {/* Sol blok: Takvim */}
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-sky-50 text-sky-700 rounded-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 mb-1" />
                  <p className="text-sm font-medium">
                    {formattedDate.replace(".", "/")}
                  </p>
                  <p className="text-sm font-semibold">{appointment.time}</p>
                </div>
                {/* Orta blok: Bilgiler */}
                <div className="flex-1 flex flex-col min-w-0">
                  <h3 className="font-semibold text-gray-900">
                    {appointment.fullName}
                  </h3>
                  <p className="text-sm font-semibold text-sky-600 mb-2">
                    {appointment.service?.title || "Hizmet bilgisi yok"}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 md:gap-16 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" /> {appointment.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {appointment.phone}
                    </span>
                  </div>
                  {appointment.note && (
                    <p className="self-start inline-block p-2 bg-gray-100 rounded-lg text-sm text-gray-700 italic">
                      "{appointment.note}"
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
