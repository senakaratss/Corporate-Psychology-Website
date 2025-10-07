import { Link } from "react-router";
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={"/hero-therapy.jpg"}
          alt="Professional therapy consultation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]">
                Ruh Sağlığınız
                <span className="block text-white drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]">
                  Bizim Önceliğimiz
                </span>
              </h1>
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-xl border-2 border-white/20 shadow-2xl">
                <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-semibold">
                  Ruh sağlığınız için güvenli bir alan sunuyoruz. Deneyimli
                  psikologlarımızla bireysel ve aile danışmanlığı hizmeti
                  alabilirsiniz.
                </p>
              </div>
            </div>

            <Link to={"/appointment"}>
              <button className="bg-green-700 text-2xl rounded-lg px-8 py-4 text-white font-medium hover:bg-green-500 transition-colors duration-200 text-center">
                Randevu Al
              </button>
            </Link>
          </div>

          {/* Hero Image - Only visible on larger screens */}
          <div className="hidden lg:block relative">
            <img
              src={"/hero-therapy.jpg"}
              alt="Professional therapy session"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
