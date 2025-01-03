import { useEffect } from "react";
import "../../assets/style/brand.css";
import SingleBrand from "../../components/layouts/BrandPage/SingleBrand";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import useData from "../../services/Hooks/useData";
const BrandPage = () => {
  const { brands, isLoading } = useData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="brand-page">
      <PageHeader title="Brands" />

      <div className="container-xl py-5">
        <div className="row g-3">
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              {brands?.slice(4).map((brand) => (
                <div key={brand._id} className="col-sm-6 col-md-4 col-lg-3">
                  <SingleBrand brand={brand} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandPage;
