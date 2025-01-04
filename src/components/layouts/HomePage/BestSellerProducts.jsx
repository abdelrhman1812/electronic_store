import "../../../assets/style/product.css";
import IsLoading from "../../shared/IsLoading/IsLoading";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import SingleProduct from "../ShopPage/Products/ProductDetails/SingleProduct";

const BestSellerProducts = ({ products, isLoading }) => {
  return (
    <section className="bestSeller-products p-section">
      <div className="container-xl">
        <SectionTitle title={"BestSeller Products"} path={"/shop"} />
        <div className="row g-4">
          {isLoading && <IsLoading columns={4} count={4} />}
          {products?.slice(8).map((product) => {
            return (
              <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
                <SingleProduct product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellerProducts;
