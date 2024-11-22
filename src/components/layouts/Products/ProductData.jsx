import { BiCart, BiHeart } from "react-icons/bi";
import IsLoading from "../../shared/IsLoading/IsLoading";
import StarRating from "./StarRating";

const ProductData = ({ product, loading }) => {
  return (
    <>
      {loading ? (
        <IsLoading count={1} columns={3} width={100} />
      ) : (
        <div className="product-data">
          <h3>{product?.title}</h3>
          <div className="rating d-flex gap-2">
            <StarRating rate={product?.rateNum} maxStars={5} />
            <span>{product?.rateNum} review</span>
          </div>
          <h4>${product?.price}</h4>
          <p className="descriptions">{product?.description}</p>
          <button className="cart border-0 text-white">
            <BiCart className="icon-cart" /> Add to cart
          </button>
          <BiHeart size={30} className="icon-wishlist" />
        </div>
      )}
    </>
  );
};

export default ProductData;
