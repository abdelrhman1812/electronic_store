import { useState } from "react";
import {
  BiCurrentLocation,
  BiDownArrowCircle,
  BiPhone,
  BiSolidUserDetail,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";
import { useUserContext } from "../../../context/UserContext";
import { useWishListContext } from "../../../context/WishlistContext";
import { removeAuthToken } from "../../../lib/cookies";

const TopNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const { userProfile, setUserProfile } = useUserContext();
  const { getUserCart } = useCartContext();
  const { getUserWishlist } = useWishListContext();
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const logOut = () => {
    removeAuthToken();
    navigate("/login");
    getUserCart();
    getUserWishlist();
    setUserProfile(null);
  };

  return (
    <section className="top-nav">
      <div className="container-xl">
        <div className="row">
          <div className="col-md-6 d-flex gap-2">
            <p className="m-0 d-none d-md-block">
              <BiCurrentLocation size={25} /> Mansoura
            </p>
            <span className=" d-none d-md-block">||</span>
            <p className="m-0 d-none d-md-block">
              <BiPhone size={25} /> 0100803461
            </p>
          </div>
          <div className="col-md-6 text-end position-relative">
            <p className="my-0 ">
              {userProfile?.user?.name || "Guest"}
              <BiSolidUserDetail
                onClick={toggleMenu}
                size={25}
                style={{ cursor: "pointer" }}
              />
            </p>
            {showMenu && (
              <div className="menu position-absolute end-0">
                <BiDownArrowCircle className="arrow-menu" />
                {userProfile?.user ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={logOut}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
