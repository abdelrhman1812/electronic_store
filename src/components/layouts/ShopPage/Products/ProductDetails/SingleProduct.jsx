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
    Aos.init({
      duration: 800,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div className="single-product position-relative h-100" data-aos="fade-up">
      <figure className="m-0">
        <img
          src={product?.imageCover?.secure_url}
          className="w-100"
          alt={product?.title}
        />

        <div className="over-lay position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center gap-2">
          <button
            onClick={() => handleAddToCart(product?._id)}
            className="border-0 shadow-sm d-flex align-items-center gap-2"
          >
            <HiOutlineShoppingCart size={18} />
            Add To Cart
          </button>

          <ul className="position-absolute list-unstyled d-flex flex-column gap-2 mb-0 action-icons">
            <li className="shadow-sm">
              {inWishlist ? (
                <FaHeart
                  size={20}
                  onClick={() => handleDeleteFromWishList(product?._id)}
                  className="text-danger"
                />
              ) : (
                <FaRegHeart
                  size={20}
                  onClick={() => handleAddToWishList(product?._id)}
                />
              )}
            </li>
            <li className="shadow-sm">
              <Link
                to={`/product/${product._id}`}
                className="text-dark d-flex align-items-center justify-content-center"
              >
                <BiShowAlt size={22} />
              </Link>
            </li>
          </ul>
        </div>
      </figure>

      <div className="product-data text-center">
        <div className="mb-2">
          <StarRating rate={product?.rateNum} maxStars={5} />
        </div>

        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <h4 className="text-truncate mb-2 px-2" title={product?.title}>
            {product?.title}
          </h4>
        </Link>

        <div className="price d-flex align-items-center justify-content-center gap-3 mt-2">
          <span className="new-price">${product?.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
