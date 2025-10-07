import useAppointments from "../../hooks/useAppointments";
import useMessages from "../../hooks/useMessages";

interface MessageProps {
  _id: string; // MongoDB ObjectId
  fullName: string;
  phone: string;
  email: string;
  subject?: string; // opsiyonel
  message: string;
  createdAt: string; // timestamps ile gelir
}
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

const AdminDashboard = () => {
  const { data: messages = [], isLoading } = useMessages();
  const { data: appointments = [] } = useAppointments();
  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p className="text-gray-600">
          Web sitenizin genel durumu ve son aktiviteler
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Yeni Randevular</p>
          <h2 className="text-2xl font-bold">12</h2>
          <p className="text-xs text-green-600">+4 bu hafta</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Okunmamış Mesaj</p>
          <h2 className="text-2xl font-bold">8</h2>
          <p className="text-xs text-green-600">+2 bu hafta</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Toplam Hizmet</p>
          <h2 className="text-2xl font-bold">24</h2>
          <p className="text-xs text-green-600">+1 bu hafta</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Blog Yazıları</p>
          <h2 className="text-2xl font-bold">48</h2>
          <p className="text-xs text-green-600">+6 bu hafta</p>
        </div>
      </div>

      {/*  Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4">Son Randevu Talepleri</h3>
          <div className="space-y-4">
            {appointments.map((appointment: AppointmentProps) => (
              <div
                key={appointment._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-slate-100 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{appointment.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.service?.title || "Hizmet bilgisi yok"}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-2 md:mt-0 flex flex-col items-start md:items-end gap-1">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-sky-200 text-sky-800">
                    {new Date(appointment.date).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    {appointment.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4">Son Mesajlar</h3>

          <div className="space-y-4">
            {messages.map((message: MessageProps) => (
              <div
                key={message._id}
                className="flex flex-col p-3 bg-slate-100 rounded-lg gap-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{message.fullName}</p>
                    {message.subject && (
                      <p className="self-start inline-block text-sm bg-green-200 text-emerald-800 px-2 rounded font-medium">
                        {message.subject}
                      </p>
                    )}
                  </div>
                  <div className="px-2 py-1">
                    <span className="text-xs font-medium">
                      {new Date(message.createdAt).toLocaleDateString("tr-TR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      {new Date(message.createdAt).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                {message.message && (
                  <p className="rounded-lg text-sm text-gray-950">
                    {message.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
