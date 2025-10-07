import axios from "axios";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: sendMessage, isPending: loading } = useMutation({
    mutationFn: async ({
      fullName,
      phone,
      email,
      subject,
      message,
    }: {
      fullName: string;
      phone: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      const res = await axiosInstance.post("/messages", {
        fullName,
        phone,
        email,
        subject,
        message,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Mesajınız başarıyla gönderildi");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Mesaj gönderilemedi");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu");
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ fullName, phone, email, subject, message });
  };
  return (
    <div className="flex flex-col bg-white shadow-lg p-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Bize Yazın</h1>
        <p className="text-gray-600">
          Sorularınızı iletebilir veya randevu talebinde bulunabilirsiniz.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
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
              pattern="[0-9]{10,11}"
              placeholder="Telefon numaranız"
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
          <label className="block text-sm font-medium">Konu</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full
                    border px-4 py-3 border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Konu seçiniz
            </option>
            <option value="Randevu Talebi">Randevu Talebi</option>
            <option value="Genel Bilgi">Genel Bilgi</option>
            <option value="Hizmetler">Hizmetler Hakkında</option>
            <option value="Ücret">Ücretler</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Mesajınız *</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Mesajınızı buraya yazın..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-3 rounded-2xl"
        >
          <Send className="h-4 w-4" />
          Mesajı Gönder
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
