import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
const AdminAbout = () => {
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [preview, setPreview] = useState("");

  // GET: Hakkımızda bilgisi
  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await axiosInstance.get("/about");
      return res.data;
    },
  });

  // UPSET: Hakkımızda bilgisi
  const { mutate: saveAbout, isPending } = useMutation({
    mutationFn: async (aboutData: {
      vision: string;
      mission: string;
      headerImage: string;
    }) => {
      const res = await axiosInstance.post("/about", aboutData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Hakkımızda bilgisi kaydedildi ✅");
    },
    onError: () => {
      toast.error("Kaydedilirken hata oluştu");
    },
  });

  // ilk yüklemede formu doldur
  useEffect(() => {
    if (data) {
      setVision(data.vision);
      setMission(data.mission);
      setHeaderImage(data.headerImage);
      setPreview(data.headerImage);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string); // base64 string
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!vision || !mission) {
      toast.error("Vizyon ve misyon boş bırakılamaz");
      return;
    }
    saveAbout({ vision, mission, headerImage });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hakkımızda</h1>
        <p className="text-gray-600">
          Vizyon, misyon ve header görselini güncelle
        </p>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          {/* Görsel Yükleme */}
          <div className="space-y-2">
            <label className="block font-semibold">Header Görseli</label>

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Header"
                className="max-h-72  w-full object-cover rounded-lg border border-gray-200"
              />
            )}

            {/* Custom button */}
            <label
              className="flex items-center justify-center gap-2 cursor-pointer p-2 bg-gradient-to-br from-sky-600 to-green-600
             text-white rounded-lg hover:scale-105 transform transition w-max"
            >
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Vizyon */}
          <div className="space-y-2">
            <label className="block font-semibold">Vizyon</label>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full min-h-[300px] px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              rows={3}
            />
          </div>

          {/* Misyon */}
          <div className="space-y-2">
            <label className="block font-semibold">Misyon</label>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full min-h-[300px] px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg"
              rows={3}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-gradient-to-r from-sky-600 to-green-400 text-white rounded-lg font-semibold"
          >
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAbout;
