import { Brain, Heart, Shield, Zap } from "lucide-react";
import ServiceDetailCard from "../components/services/ServiceDetailCard";
import Card from "../components/layout/Card";
import Banner from "../components/layout/Banner";
import useServices from "../hooks/useServices";

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  duration: string;
}
const ServicesPage = () => {
  const { data: services = [] } = useServices();

  const specializedServices = [
    {
      icon: Zap,
      title: "Travma Terapisi (EMDR)",
      description:
        "Travma sonrası stres bozukluğu için özelleşmiş EMDR terapi tekniği",
    },
    {
      icon: Shield,
      title: "Kriz Müdahalesi",
      description: "Acil durumlarda 24 saat erişilebilir kriz müdahale hizmeti",
    },
    {
      icon: Heart,
      title: "Yas Danışmanlığı",
      description: "Kayıp yaşayan bireyler için özel yas süreci danışmanlığı",
    },
    {
      icon: Brain,
      title: "Nöropsikoljik Değerlendirme",
      description:
        "Bilişsel fonksiyonların detaylı değerlendirilmesi ve raporlanması",
    },
  ];

  return (
    <div>
      <Banner
        image="/depresyon-banner.jpg"
        title="Hizmetlerimiz"
        description="Ruh sağlığınızı desteklemek için geniş bir hizmet yelpazesi sunuyoruz. Her yaş grubuna ve ihtiyaca yönelik profesyonel psikolojik destek."
      />

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {services.map((service: ServiceProps) => (
              <ServiceDetailCard
                title={service.title}
                icon={service.icon}
                description={service.description}
                features={service.features}
                duration={service.duration}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4 text-3xl lg:text-4xl font-bold">
            Özel Hizmetler
          </h1>
          <p className="mb-4 text-center text-lg text-gray-600">
            Özel durumlar ve ihtiyaçlar için sunduğumuz uzmanlaşmış hizmetler
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializedServices.map((service) => (
              <Card
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/*TODO:MAPPLE */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-4 text-3xl lg:text-4xl font-bold">
            Terapi Sürecimiz
          </h2>
          <p className="mb-8 text-center text-lg text-gray-600">
            Size en uygun tedavi planını oluşturmak için izlediğimiz adımlar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center mx-auto w-16 h-16 bg-green-700 rounded-full text-2xl  font-bold text-white">
                1
              </div>
              <h3 className="font-semibold">İlk Görüşme</h3>
              <p className="text-gray-600 text-sm">
                Durumunuzu değerlendiriyoruz ve ihtiyaçlarınızı belirliyoruz.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center mx-auto w-16 h-16 bg-green-700 rounded-full text-2xl  font-bold text-white">
                2
              </div>
              <h3 className="font-semibold">Plan Oluşturma</h3>
              <p className="text-gray-600 text-sm">
                Size özel terapi planı hazırlıyor ve hedefleri belirliyoruz.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center mx-auto w-16 h-16 bg-green-700 rounded-full text-2xl  font-bold text-white">
                3
              </div>
              <h3 className="font-semibold">Terapi Süreci</h3>
              <p className="text-gray-600 text-sm">
                Düzenli seanslarla terapi sürecini başlatıyor ve devam
                ettiriyoruz.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center mx-auto w-16 h-16 bg-green-700 rounded-full text-2xl  font-bold text-white">
                4
              </div>
              <h3 className="font-semibold">Değerlendirme</h3>
              <p className="text-gray-600 text-sm">
                İlerlemenizi değerlendiriyor ve gerektiğinde planı
                güncelliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
