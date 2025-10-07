import { MapPin } from "lucide-react";

const Map = () => {
  return (
    <div className="h-64 bg-gradient-to-br from-white to-green-500 rounded-lg flex items-center justify-center">
      <div className="text-center text-white">
        <MapPin className="mx-auto h-12 w-12" />
        <p className="font-medium">Harita Görünümü</p>
        <p className="text-sm opacity-90">Kızılay, Çankaya/Ankara</p>
      </div>
    </div>
  );
};

export default Map;
