import { Calendar, MessageCircle, Phone } from "lucide-react";
import { useContacts } from "../../hooks/useContact";

const QuickContactOptions = () => {
  const { data: contactData } = useContacts();

  return (
    <div className="flex flex-col bg-white rounded-lg p-6 gap-4">
      <h1 className="text-xl font-bold text">Hızlı İletişim</h1>
      <button className="px-6 py-3 w-full rounded-2xl flex items-center gap-4 bg-green-700 hover:bg-green-800 text-white font-semibold cursor-pointer">
        <Phone className="h-4 w-4" />
        <span>Hemen Ara: {contactData?.phone}</span>
      </button>
      <button className="px-6 py-3 w-full rounded-2xl flex items-center gap-4 bg-slate-50  hover:text-green-700 hover:bg-slate-100  font-semibold cursor-pointer">
        <MessageCircle className="h-4 w-4" />
        <span> WhatsApp ile Yaz</span>
      </button>
      <button className="px-6 py-3 w-full rounded-2xl flex items-center gap-4 bg-slate-50 hover:text-green-700 hover:bg-slate-100 font-semibold cursor-pointer">
        <Calendar className="h-4 w-4" />
        <span> Online Randevu Al</span>
      </button>
    </div>
  );
};

export default QuickContactOptions;
