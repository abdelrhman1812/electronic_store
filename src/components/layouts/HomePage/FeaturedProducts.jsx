import "../../../assets/style/product.css";
import IsLoading from "../../shared/IsLoading/IsLoading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import SingleProduct from "../ShopPage/Products/ProductDetails/SingleProduct";

const FeaturedProducts = ({ products, isLoading }) => {
  return (
    <section className="featured-product p-section overflow-hidden">
      <div className="container-xl">
        <SectionTitle title={"Featured Products"} path={"/shop"} />
        <div className="row g-4">
          {isLoading && <IsLoading />}
          {products?.slice(0, 8).map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
