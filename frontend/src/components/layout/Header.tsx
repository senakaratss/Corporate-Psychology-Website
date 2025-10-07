import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useContacts } from "../../hooks/useContact";
const Header = () => {
  const { data: contactData } = useContacts();

  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    {
      name: "Anasayfa",
      href: "/",
    },
    {
      name: "Hakkımızda",
      href: "/about",
    },
    {
      name: "Hizmetler",
      href: "/services",
    },
    {
      name: "Blog",
      href: "/blogs",
    },
    {
      name: "İletişim",
      href: "/contact",
    },
  ];
  return (
    <header className="sticky top-0 z-50 bg-gray-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/*Icon and Text */}
          <a href="/" className="flex items-center gap-3">
            {/*<div className="rounded-full bg-gray-50 p-2 shadow-md">
              <img src="/mental-health.png" className="size-10" />
            </div>*/}
            <span className="font-semibold text-2xl">
              {contactData?.companyName}
            </span>
          </a>
          {/*Desktop Navigation */}
          <nav className="space-x-8 hidden md:flex">
            {navigation.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className="font-medium hover:text-gray-800"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Link to={"/appointment"}>
              <button className="bg-green-700 rounded-2xl px-4 py-3 text-white font-medium whitespace-nowrap cursor-pointer hover:bg-green-800 transition-colors duration-200 text-center">
                Randevu Al
              </button>
            </Link>
          </div>

          {/*Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/*Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-green-800 hover:bg-green-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
