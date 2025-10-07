import {
  Heart,
  Users,
  Target,
  Shield,
  Award,
  CheckCircle,
  Clock,
} from "lucide-react";
import Card from "../components/layout/Card";
import Banner from "../components/layout/Banner";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
const values = [
  {
    icon: Heart,
    title: "Empati ve Anlayış",
    description:
      "Her hastamıza karşı derin empati ve anlayış göstererek, güvenli bir terapi ortamı yaratıyoruz.",
  },
  {
    icon: Shield,
    title: "Gizlilik ve Güven",
    description:
      "Hasta mahremiyeti ve güvenliği en üst düzeyde korunarak terapi süreci yürütülür.",
  },
  {
    icon: Target,
    title: "Hedefe Yönelik Yaklaşım",
    description:
      "Her hasta için özel hedefler belirleyerek, somut sonuçlar elde etmeyi amaçlıyoruz.",
  },
  {
    icon: Users,
    title: "Bütüncül Bakış",
    description:
      "Kişiyi sosyal, kültürel ve ailevi bağlamında değerlendirerek bütüncül yaklaşım sergiliyoruz.",
  },
];

const AboutPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await axiosInstance.get("/about");
      return res.data;
    },
  });
  if (isLoading) return <p>Yükleniyor...</p>;
  return (
    <div>
      <Banner
        image={data?.headerImage}
        title="Hakkımızda"
        description="Ataş Psikoloji olarak, ruh sağlığı alanında uzun yıllardır profesyonel hizmet veren deneyimli bir ekiple, bireylerin yaşam kalitesini artırmak için çalışıyoruz."
      />

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col space-y-4 bg-white shadow rounded-lg py-10 px-4 sm:px-6 lg:px-8 ">
              <div className="flex items-center justify-center w-16 h-16 bg-green-700/10 rounded-full p-4 shadow text-green-700">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                {data?.mission}
              </p>
            </div>

            <div className="flex flex-col space-y-4 bg-white shadow rounded-lg py-10 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center w-16 h-16 bg-green-700/10 rounded-full p-4 shadow text-green-700">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                {data?.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Değerlerimiz
            </h2>
            <p className="text-lg text-gray-600">
              Çalışmalarımızda rehber aldığımız temel değerler ve
              yaklaşımlarımız
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tedavi Yaklaşımımız
            </h2>
            <p className="text-lg text-gray-600">
              Kanıta dayalı terapi yöntemleri kullanarak kişiselleştirilmiş
              tedavi planları oluşturuyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Bilişsel Davranışçı Terapi (BDT)
                    </h3>
                    <p className="text-gray-600">
                      Düşünce, duygu ve davranış arasındaki ilişkiyi anlayarak
                      sağlıksız kalıpları değiştirmeyi hedefler.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Psikodinamik Terapi
                    </h3>
                    <p className="text-gray-600">
                      Bilinçaltı süreçleri ve geçmiş yaşantıları anlayarak
                      mevcut sorunları çözmeyi amaçlar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Mindfulness ve Kabul Temelli Yaklaşımlar
                    </h3>
                    <p className="text-gray-600">
                      An'da kalma, kabullenme ve farkındalık geliştirme odaklı
                      terapi teknikleri.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Aile ve Sistem Terapisi
                    </h3>
                    <p className="text-gray-600">
                      Aile dinamiklerini ve ilişki sistemlerini iyileştirmeye
                      odaklanan bütüncül yaklaşım.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 bg-white shadow rounded-lg py-10 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center w-16 h-16 bg-green-700/10 rounded-full p-4 shadow text-green-700">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">Terapi Süreci</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                İlk görüşmede durumunuzu değerlendiriyoruz, size uygun terapi
                yöntemini belirliyoruz ve birlikte bir tedavi planı
                oluşturuyoruz. Her seans sonunda ilerlemenizi değerlendirerek
                planı güncelleriz.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-700" />
                  <span className="text-sm text-gray-600">
                    İlk değerlendirme seansı
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-700" />
                  <span className="text-sm text-gray-600">
                    Kişiselleştirilmiş terapi planı
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-700" />
                  <span className="text-sm text-gray-600">
                    Düzenli ilerleme değerlendirmesi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
