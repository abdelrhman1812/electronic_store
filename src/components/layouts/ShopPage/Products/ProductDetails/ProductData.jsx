import { BiCart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import useProductAction from "../../../../../services/Hooks/ProductAction";
import StarRating from "../../../../common/StarRating";
import IsLoading from "../../../../shared/IsLoading/IsLoading";

const ProductData = ({ product, loading }) => {
  if (loading) {
    return <IsLoading count={1} columns={3} width={100} />;
  }

  if (!product) {
    return <p>Product data is unavailable.</p>;
  }

  const {
    handleAddToWishList,
    handleDeleteFromWishList,
    handleAddToCart,
    inWishlist,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useProductAction(product);

  return (
    <div className="product-data">
      <h3>{product?.title}</h3>
      <div className="rating d-flex gap-2">
        <StarRating rate={product?.rateNum} maxStars={5} />
        <span>
          {product?.rateNum} review{product?.rateNum === 1 ? "" : "s"}
        </span>
      </div>
      <h4 className="price mt-3">${product?.price}</h4>
      <p className="descriptions">{product?.description}</p>

      <div className="d-flex align-items-center gap-3">
        {/* Add to cart button */}
        <button
          className="cart border-0 text-white d-flex justify-content-center align-items-center gap-2"
          onClick={() => handleAddToCart(product._id)}
        >
          <BiCart className="icon-cart" /> Add to cart
        </button>

        {/* Add/Delete from wishlist button */}
        <FaHeart
          size={30}
          className={` ${inWishlist ? " text-danger" : "text-primary"}`}
          onClick={() =>
            inWishlist
              ? handleDeleteFromWishList(product?._id)
              : handleAddToWishList(product?._id)
          }
        />
      </div>
    </div>
  );
};

export default ProductData;
