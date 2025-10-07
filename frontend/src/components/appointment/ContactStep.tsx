import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import axios from "axios";

interface StepContactProps {
  services: { _id: string; title: string; duration: string }[];
  selectedService: string;
  selectedDate: string;
  selectedTime: string;
  prevStep: () => void;
  handleConfirm: () => void;
}
const ContactStep = ({
  services,
  selectedService,
  selectedDate,
  selectedTime,
  prevStep,
  handleConfirm,
}: StepContactProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [note, setNote] = useState("");

  const { mutate: createAppointment, isPending: loading } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosInstance.post("/appointments", {
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          fullName,
          phone,
          email,
          age: age || undefined,
          note,
        });
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // Axios hatası
          throw new Error(err.response?.data?.message || "Randevu alınamadı");
        }
        throw new Error("Bilinmeyen bir hata oluştu");
      }
    },
    onSuccess: () => {
      toast.success("Randevu başarıyla oluşturuldu");
      handleConfirm(); // ✅ Onay
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold"> İletişim Bilgileri</h2>
        <p className="text-gray-600">
          Randevunuzu onaylamak için bilgilerinizi girin
        </p>
      </div>
      {/* Summary */}
      <div className="bg-green-50 border border-green-800/10 rounded-xl">
        <div className="p-6">
          <h3 className="font-semibold mb-4">Randevu Özeti</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold">Hizmet:</span>
              <span>
                {services.find((s) => s._id === selectedService)?.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Tarih:</span>
              <span>{selectedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Saat:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Süre:</span>
              <span>
                {services.find((s) => s._id === selectedService)?.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          createAppointment();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Ad Soyad *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Adınızı ve soyadınızı girin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Telefon *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefon numaranız"
              pattern="\d{10,15}" // Sadece 10-15 haneli rakamlar kabul edilir
              title="Lütfen geçerli bir telefon numarası girin"
              required
              className="w-full border px-4 py-3 border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">E-posta *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            required
            className="w-full border px-4 py-3 border-gray-300 rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Yaş</label>
          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value ? parseInt(e.target.value) : "")
            }
            className="w-full border px-4 py-3 border-gray-300 rounded-lg"
            placeholder="Yaşınız"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Notlarınız (Opsiyonel)
          </label>
          <textarea
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Mesajınızı buraya yazın..."
          ></textarea>
        </div>

        <div className="flex items-center justify-between ">
          <button
            onClick={prevStep}
            className=" flex items-center justify-center bg-gray-100 border border-gray-300 px-4 py-2 hover:bg-gray-200 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
          >
            <span className="font-semibold">Geri</span>
          </button>
          <button
            type="submit"
            disabled={
              !selectedDate || !selectedTime || !selectedService || loading
            }
            className="flex items-center justify-center bg-green-700 hover:bg-green-800 px-6 py-3 rounded-2xl gap-2 transition-all duration-300 cursor-pointer"
          >
            <span className="text-white font-semibold">
              {" "}
              {loading ? "Gönderiliyor..." : "Randevumu Onayla"}
            </span>
            <ArrowRight className="size-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactStep;
