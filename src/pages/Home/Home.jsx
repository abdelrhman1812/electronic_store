import "../../assets/style/home.css";
import Banner from "../../components/layouts/Banner";
import CategorySection from "../../components/layouts/CategorySection/CategorySection";
import HeroSection from "../../components/layouts/HeroSection";
import OfferSection from "../../components/layouts/OfferSection";
import BestSellerProducts from "../../components/layouts/Products/BestSellerProducts";
import FeaturedProducts from "../../components/layouts/Products/FeaturedProducts";
import useData from "../../services/Hooks/useData";

const Home = () => {
  const { products, categories, isLoading } = useData();

  return (
    <section className="home overflow-hidden">
      <HeroSection />
      <CategorySection categories={categories} isLoading={isLoading} />
      <Banner />
      <FeaturedProducts products={products} isLoading={isLoading} />
      <OfferSection />
      <BestSellerProducts products={products} isLoading={isLoading} />
    </section>
  );
};

export default Home;
