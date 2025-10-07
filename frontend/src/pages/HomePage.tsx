import HeroSection from "../components/homepage/HeroSection";
import Services from "../components/homepage/Services";
import FAQ from "../components/homepage/FAQ";
import Comments from "../components/homepage/Comments";
import Blogs from "../components/homepage/Blogs";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Services />
      <FAQ />
      <Comments />
      <Blogs />
    </div>
  );
};

export default HomePage;
