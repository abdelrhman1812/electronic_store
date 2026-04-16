import imgNotFound from "../../../assets/Images/not-found.png";
import "../../../assets/style/shared.css";

const ProductNotFound = () => {
  return (
    <section className="product-not-found py-5 d-flex flex-column justify-content-center align-items-center text-center">
      <figure className="mb-4 d-flex justify-content-center">
        <img src={imgNotFound} className="w-50 opacity-75" alt="Products not found" />
      </figure>
      <h3 className="fw-bold text-dark mb-2">No Products Found</h3>
      <p className="text-muted mb-4 px-3" style={{ maxWidth: "450px" }}>
        We couldn't find any products matching your current filters. Try adjusting your price range or selecting different categories.
      </p>
    </section>
  );
};

export default ProductNotFound;
