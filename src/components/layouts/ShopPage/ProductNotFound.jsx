import imgNotFound from "../../../assets/Images/not-found.png";
import "../../../assets/style/shared.css";

const ProductNotFound = () => {
  return (
    <section className="product-not-found min-vh-100 d-flex flex-column justify-content-center align-items-center ">
      <figcaption>Products Not Found</figcaption>
      <figure className="m-0  d-flex justify-content-center">
        <img src={imgNotFound} className="w-50" alt="not found" />
      </figure>
    </section>
  );
};

export default ProductNotFound;
