interface CardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}
const Card = ({ icon, title, description }: CardProps) => {
  const Icon = icon;
  return (
    <div className="group flex flex-col items-center bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 gap-4">
      <div
        className="flex items-center justify-center bg-gray-200/80 rounded-full p-4 shadow text-green-700
      group-hover:bg-green-700 group-hover:scale-110 group-hover:text-white
                      transition-all duration-300"
      >
        <Icon size={24} />
      </div>
      <h3 className="text-center font-semibold text-lg whitespace-nowrap">
        {title}
      </h3>
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default Card;
