import Aos from "aos";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";
import { useWishListContext } from "../../../context/WishlistContext";
import { checkAuthToken } from "../../../lib/cookies";
import notify from "../../../lib/notify";

const SingleProduct = ({ product }) => {
  const { addProductToCart } = useCartContext();
  const { addProductToWishList, deleteProductFromWishlist, wishList } =
    useWishListContext();

  const isInWishlist = useMemo(
    () => wishList?.some((item) => item._id === product._id),
    [wishList, product._id]
  );
  const [inWishlist, setInWishlist] = useState(isInWishlist);

  const isAuthenticated = useMemo(() => checkAuthToken(), []);

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    addProductToCart(product._id);
    if (!isAuthenticated) {
      notify("error", "You need to be logged in");
    } else {
      notify("success", "Success! Product added to cart");
    }
  }, [addProductToCart, product._id, isAuthenticated]);

  // Add to wishlist handler
  const handleAddToWishList = useCallback(() => {
    if (!isAuthenticated) {
      notify("error", "You need to be logged in");
      return;
    }
    addProductToWishList(product._id);
    notify("success", "Success! Product added to wishlist");
    setInWishlist(true);
  }, [addProductToWishList, product._id, isAuthenticated]);

  // Delete from wishlist handler
  const handleDeleteFromWishList = useCallback(() => {
    if (!isAuthenticated) {
      notify("error", "You need to be logged in");
      return;
    }
    deleteProductFromWishlist(product._id);
    notify("success", "Product removed from wishlist");
    setInWishlist(false);
  }, [deleteProductFromWishlist, product._id, isAuthenticated]);

  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div
      className="single-product position-relative overflow-hidden"
      // data-aos="fade-up"
      // data-aos-easing="ease-in-sine"
      // data-aos-duration="1000"
    >
      <figure>
        <img
          src={product?.imageCover?.secure_url}
          className="w-100"
          alt={product?.title}
        />
      </figure>
      <Link to={`/product/${product._id}`}>
        <h4
          className="overflow-hidden text-nowrap position-relative text-truncate"
          title={product?.title}
        >
          {product?.title}
        </h4>
      </Link>
      {[...Array(4)].map((_, index) => (
        <FaStar key={index} className="text-warning" />
      ))}
      <div className="price d-flex align-items-center gap-3 my-3">
        <span className="old-price text-muted text-decoration-line-through">
          {/* Optional Old Price */}
        </span>
        <span className="new-price">
          {product?.priceAfterDiscount > 1
            ? product.priceAfterDiscount
            : product?.price}
          $
        </span>
        <span className="discount badge bg-danger-subtle text-danger rounded-5">
          20%
        </span>
      </div>

      <div className="over-lay position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center">
        <button onClick={handleAddToCart} className="border-0">
          <HiOutlineShoppingCart size={20} className="me-1 mb-1" />
          Add To Cart
        </button>
        <ul className="position-absolute">
          <li className="mb-2">
            {inWishlist ? (
              <FaHeart
                size={27}
                onClick={handleDeleteFromWishList}
                className="text-danger"
              />
            ) : (
              <FaRegHeart size={27} onClick={handleAddToWishList} />
            )}
          </li>
          <li className="mb-2">
            <IoSearchOutline size={27} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleProduct;
