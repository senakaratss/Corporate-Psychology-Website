import { useState } from "react";
import FAQCard from "./cards/FAQCard";
const faqs = [
  {
    question: "Psikolojik destek almaya ne zaman başlamalıyım?",
    answer:
      "Hayatınızı olumsuz etkileyen stres, kaygı, depresyon veya ilişki sorunları gibi durumlar başladığında profesyonel destek almak faydalıdır.",
  },
  {
    question: "Terapilere kimler katılabilir?",
    answer:
      "Terapiler her yaş grubundan bireylere açıktır; çocuk, ergen, yetişkin veya yaşlı fark etmeksizin herkes destek alabilir.",
  },
  {
    question: "Online terapi ile yüz yüze terapi arasında fark var mı?",
    answer:
      "Temel fark ortamdır. Online terapiler, uygun platformlarda güvenli şekilde yapılabilir ve çoğu zaman yüz yüze seans kadar etkilidir.",
  },
  {
    question: "Seanslar ne kadar sürer ve sıklığı ne olmalıdır?",
    answer:
      "Seanslar genellikle 45-60 dakika sürer. Sıklık danışanın ihtiyacına göre haftada bir veya iki kez olabilir.",
  },
  {
    question: "Psikoloğa gitmek yalnızca kriz anlarında mı gereklidir?",
    answer:
      "Hayır, psikoloğa gitmek sadece kriz anlarında değil, kişisel gelişim, stres yönetimi ve yaşam kalitesini artırmak için de faydalıdır.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              quisquam. Pariatur quod ad quas facere aliquid architecto fugit
              magni sint iure exercitationem, sed, unde eveniet repellat illo
              dolore at ea.
            </p>
            <img
              src="/faq.jpg"
              className="h-80 w-140 shadow-lg rounded-2xl"
              alt="faq"
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
