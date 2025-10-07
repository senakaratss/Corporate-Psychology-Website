import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Card from "../components/layout/Card";
import ContactForm from "../components/contact/ContactForm";
import QuickContactOptions from "../components/contact/QuickContactOptions";
import EmergencyContact from "../components/contact/EmergencyContact";
import Map from "../components/contact/Map";
import Banner from "../components/layout/Banner";
import { useContacts } from "../hooks/useContact";

const ContactPage = () => {
  const { data: contactData, isLoading } = useContacts();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!contactData) return <p>İletişim bilgileri bulunamadı</p>;
  const contactItems = [
    { icon: Phone, title: "Telefon", description: contactData.phone },
    { icon: Mail, title: "E-posta", description: contactData.email },
    { icon: MapPin, title: "Adres", description: contactData.address },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      description: contactData.workingHours,
    },
  ];
  return (
    <div>
      <Banner
        image="/depresyon-banner.jpg"
        title="İletişim"
        description="Size yardımcı olmaktan mutluluk duyarız. Sorularınız, randevu talepleriniz veya destek ihtiyaçlarınız için bizimle iletişime geçin."
      />

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactItems.map((contactItem) => (
              <Card
                icon={contactItem.icon}
                title={contactItem.title}
                description={contactItem.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/*Contact Form */}
            <ContactForm />
            {/* Map & Additional Info */}
            <div className="flex flex-col space-y-8">
              {/* Map Placeholder */}
              <Map />
              {/* Quick Contact Options */}
              <QuickContactOptions />
              {/* Emergency Contact */}
              <EmergencyContact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
