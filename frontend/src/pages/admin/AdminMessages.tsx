import { MessageCircle, Search, Mail, Phone, Clock, Eye } from "lucide-react";
import useMessages from "../../hooks/useMessages";
import { useState } from "react";

interface MessageProps {
  _id: string; // MongoDB ObjectId
  fullName: string;
  phone: string;
  email: string;
  subject?: string; // opsiyonel
  message: string;
  createdAt: string; // timestamps ile gelir
}
const AdminMessages = () => {
  const { data: messages = [], isLoading } = useMessages();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(
    (message: MessageProps) =>
      message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold ">İletişim Mesajları</h1>
        <p className="text-gray-600">Gelen mesajları görüntüle ve yanıtla</p>
      </div>

      <div className="relative">
        <Search className="absolute inset-y-0 left-2 w-4 h-4 my-auto text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Mesaj ara..."
          className="pl-8 pr-2 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full lg:w-96"
        />
      </div>
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Henüz mesaj bulunmamaktadır.
          </p>
        ) : (
          filteredMessages.map((message: MessageProps) => (
            <div
              key={message._id}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row min-w-0 flex-1 gap-4">
                <div className="flex flex-col items-center justify-center w-16 h-16 gap-1 bg-green-100 rounded-xl flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-700" />
                  <span className="text-green-700 font-semibold text-sm">
                    {" "}
                    {new Date(message.createdAt).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-semibold text-gray-900">
                    {message.fullName}
                  </h3>
                  {message.subject && (
                    <p className="text-sm font-semibold text-sky-600 mb-2">
                      {message.subject}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" /> {message.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {message.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">
                      {" "}
                      {new Date(message.createdAt).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="p-2 bg-gray-50 rounded-lg text-sm text-gray-700 italic">
                    "{message.message}"
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap flex-row md:flex-col gap-2">
                <button className="flex-1 flex items-center justify-center text-xs bg-sky-600 text-white px-3 py-2 rounded-xl font-semibold cursor-pointer">
                  <Eye className="w-4 h-4 mr-1" />
                  Görüntüle
                </button>
                <button className="flex-1 flex items-center justify-center text-xs bg-gray-100 px-3 py-2 rounded-xl font-semibold border border-gray-200 cursor-pointer">
                  <Mail className="w-4 h-4 mr-1" />
                  Yanıtla
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
