import { BiCart, BiHeart, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";
import { useWishListContext } from "../../../context/WishlistContext";
import SearchInput from "../../layouts/ShopPage/Products/ProductSearch/SearchInput/SearchInput";
import Logo from "../Logo/Logo";
import NavBar from "./NavBar";

const MainHeader = ({ toggle, setShowNav, showNav }) => {
  const { cartLength } = useCartContext();
  const { wishListLength } = useWishListContext();

  return (
    <section className="main-header">
      <div className="container-xl px-3 py-3">
        <div className="row">
          {/* Logo */}
          <Logo />
          {/* Navbar */}
          <div className="col-md-4">
            <NavBar showNav={showNav} toggle={toggle} />
          </div>

          {/* Search Input & Icons ==> Cart & Wishlist */}
          <div className="col-md-6  header-bottom d-flex justify-content-between  align-items-center">
            <SearchInput />
            <div className="header-icons  d-flex justify-content-center align-items-center gap-3 ">
              <Link
                to={"/"}
                className="d-flex flex-column align-items-center gap-2 text-white home-icon"
              >
                <BiCart size={20} />
                <span>Home</span>
              </Link>
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
        </div>
      </div>
    </section>
  );
};

export default MainHeader;
