import { useEffect } from "react";
import "../../assets/style/home.css";
import Banner from "../../components/layouts/HomePage/Banner";
import BestSellerProducts from "../../components/layouts/HomePage/BestSellerProducts";
import CategorySection from "../../components/layouts/HomePage/CategorySection/CategorySection";
import FeaturedProducts from "../../components/layouts/HomePage/FeaturedProducts";
import HeroSection from "../../components/layouts/HomePage/HeroSection";
import OfferSection from "../../components/layouts/HomePage/OfferSection";
import ReviewsSection from "../../components/layouts/HomePage/ReviewsSection";
import useData from "../../services/Hooks/useData";

const Home = () => {
  const { products, categories, isLoading } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home overflow-hidden">
      <HeroSection />
      <CategorySection categories={categories} isLoading={isLoading} />
      <Banner />
      <FeaturedProducts products={products} isLoading={isLoading} />
      <OfferSection />
      <BestSellerProducts products={products} isLoading={isLoading} />
      <ReviewsSection />
    </main>
  );
};

export default Home;
