import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router";
import { useContacts } from "../../hooks/useContact";
const Footer = () => {
  const { data: contactData } = useContacts();
  const contactItems = [
    {
      icon: Phone,
      text: contactData?.phone,
    },
    {
      icon: MapPin,
      text: contactData?.address,
    },
    {
      icon: Clock,
      text: contactData?.workingHours,
    },
    { icon: Mail, text: contactData?.email },
  ];

  const socialItems = [
    {
      icon: Instagram,
      text: contactData?.instagram,
    },
    {
      icon: Twitter,
      text: contactData?.twitter,
    },
    {
      icon: Facebook,
      text: contactData?.facebook,
    },
  ];
  return (
    <footer className="bg-green-800 text-white space-y-8 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-start md:place-items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full">
                <img src="/mental-health.png" className="h-12 w-12" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Ataş Psikoloji</h3>
              </div>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex items-center gap-3">
              {socialItems.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-2 rounded-full text-gray-700 hover:bg-gray-200 hover:text-green-700 transition duration-300"
                  >
                    <Icon className="w-5 h-5 " />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kurumsal</h3>

            <div className="flex flex-col space-y-3">
              <Link to={"/about"} className="hover:underline">
                Hakkımmızda
              </Link>
              <Link to={"/services"} className="hover:underline">
                Hizmetler
              </Link>
              <Link to={"/blogs"} className="hover:underline">
                Blog
              </Link>
              <Link to={"/contact"} className="hover:underline">
                İletişim
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-3">
              {contactItems.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{contact.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Hairline */}
        <div className="border-t border-slate-400 mt-10 pt-4 text-center">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-200">
              © 2025 Fahrettin ATAŞ Psikoloji Kliniği. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={"/privacy-policy"}
                className="text-sm underline text-gray-200"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/term-condiyion"}
                className="text-sm underline text-gray-200"
              >
                Term & Condition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
