interface BannerProps {
  image: string;
  title: string;
  description: string;
}
const Banner = ({ image, title, description }: BannerProps) => {
  return (
    <section
      style={{ backgroundImage: `url(${image})` }}
      className="bg-cover bg-center py-10 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-glow text-center text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-glow text-lg leading-relaxed text-center drop-shadow-md">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Banner;
