import { BiCart, BiHeart, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

const HeaderIcons = ({ toggle, cartLength, wishListLength }) => {
  return (
    <div className="col-md-3 d-flex justify-content-center align-items-center">
      <div className="header-icons d-flex justify-content-center align-items-center gap-3 ">
        <div className="position-relative">
          <Link
            to={"/wishlist"}
            className="d-flex flex-column align-items-center gap-2 text-white"
          >
            <BiHeart size={20} />
            <span>Wishlist</span>
            <small className="qty wishlist-qty position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center text-white rounded-circle">
              {wishListLength}
            </small>
          </Link>
        </div>

        <div className="position-relative">
          <Link
            to={"/cart"}
            className="d-flex flex-column align-items-center gap-2 text-white"
          >
            <BiCart size={20} />
            <span>Cart</span>
            <small className="qty cart-qty position-absolute top-0 end-0  d-flex justify-content-center align-items-center text-white rounded-circle">
              {cartLength}
            </small>
          </Link>
        </div>

        <div className="menu-toggle ">
          <p
            onClick={() => toggle()}
            className="d-flex text-white m-0 flex-column align-items-center gap-2"
          >
            <BiMenu size={20} />
            <span>Menu</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderIcons;
