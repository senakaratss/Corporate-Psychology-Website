import { ChevronLeft, ChevronRight } from "lucide-react";
import CommentCard from "./cards/CommentCard";
import { useEffect, useState } from "react";

const comments = [
  {
    id: 1,
    name: "Sena Karataş",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vel sint in quas? ",
    image: "/avatar.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Ahmet Yılmaz",
    comment:
      "Harika bir deneyim! Kesinlikle tavsiye ederim, her şey mükemmeldi.",
    image: "/avatar.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Elif Demir",
    comment:
      "Beklentilerimin çok üzerinde bir hizmet aldım. Çok memnun kaldım!",
    image: "/avatar.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Mert Kaya",
    comment:
      "Fena değildi, fakat bazı detaylar geliştirilebilir. Genel olarak iyiydi.",
    image: "/avatar.jpg",
    rating: 3,
  },
  {
    id: 5,
    name: "Ayşe Öztürk",
    comment:
      "Mükemmel bir deneyim! Tekrar denemeyi düşünüyorum ve herkese öneriyorum.",
    image: "/avatar.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: " Test",
    comment:
      "Mükemmel bir deneyim! Tekrar denemeyi düşünüyorum ve herkese öneriyorum.",
    image: "/avatar.jpg",
    rating: 1,
  },
];

const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); //mobil
      } else {
        setItemsPerPage(3); //desktop & tablet
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(comments.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= comments.length ? 0 : prev + itemsPerPage
    );
  };
  const visibleComments = comments.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-3xl lg:text-4xl text-center font-bold">
            Our Special Patients Say
          </h1>
          <div className="flex justify-between items-center">
            <span className=" text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
              iure voluptates corporis quo odio nobis rerum corrupti.
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="bg-green-700 rounded-full text-slate-100 p-2 flex items-center justify-center hover:bg-slate-200 hover:text-green-700"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-slate-200 rounded-full shadow  text-green-700 p-2 flex items-center justify-center hover:bg-green-700 hover:text-slate-100"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 items-stretch">
            {visibleComments.map((comment) => (
              <CommentCard
                key={comment.id}
                name={comment.name}
                comment={comment.comment}
                image={comment.image}
                rating={comment.rating}
              />
            ))}
          </div>

          {/* Mobil slider */}
          <div className="block md:hidden items-stretch">
            <CommentCard
              key={comments[currentIndex].id}
              name={comments[currentIndex].name}
              comment={comments[currentIndex].comment}
              image={comments[currentIndex].image}
              rating={comments[currentIndex].rating}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
