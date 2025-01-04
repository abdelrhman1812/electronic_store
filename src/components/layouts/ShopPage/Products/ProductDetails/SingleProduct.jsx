import Aos from "aos";
import { useEffect } from "react";
import { BiShowAlt } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useProductAction from "../../../../../services/Hooks/ProductAction";
import StarRating from "../../../../common/StarRating";

const SingleProduct = ({ product }) => {
  const {
    handleAddToWishList,
    handleDeleteFromWishList,
    handleAddToCart,
    inWishlist,
  } = useProductAction(product);
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="single-product position-relative overflow-hidden">
      <figure>
        <img
          src={product?.imageCover?.secure_url}
          className="w-100 rounded-3"
          alt={product?.title}
        />
      </figure>

      <div className="product-data p-2">
        <Link to={`/product/${product._id}`}>
          <h4
            className="overflow-hidden text-nowrap position-relative text-truncate"
            title={product?.title}
          >
            {product?.title}
          </h4>
        </Link>
        <StarRating rate={product?.rateNum} maxStars={5} />
        <div className="price d-flex align-items-center gap-4 my-3">
          <span>
            {product?.discount > 1 ? (
              <>
                <span className="old-price text-decoration-line-through me-2">
                  {product?.price}$
                </span>
                <span className="new-price">{product.priceAfterDiscount}$</span>
              </>
            ) : (
              <span className="new-price">{product?.price}$</span>
            )}
          </span>
          {product?.discount > 1 && (
            <span className="discount badge bg-danger-subtle text-danger rounded-5">
              {product.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="over-lay position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center">
        <button
          onClick={() => handleAddToCart(product?._id)}
          className="border-0"
        >
          <HiOutlineShoppingCart size={20} className="me-1 mb-1 text-white" />
          Add To Cart
        </button>
        <ul className="position-absolute">
          <li className="mb-2">
            {inWishlist ? (
              <FaHeart
                size={27}
                onClick={() => handleDeleteFromWishList(product?._id)}
                className="text-danger"
              />
            ) : (
              <FaRegHeart
                size={27}
                onClick={() => handleAddToWishList(product?._id)}
              />
            )}
          </li>
          <li className="mb-2">
            <Link to={`/product/${product._id}`}>
              <BiShowAlt size={27} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleProduct;
