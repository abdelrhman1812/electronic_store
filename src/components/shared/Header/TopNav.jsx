import { useState } from "react";
import { BiLocationPlus, BiPhone, BiSolidUserDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../context/CartContext";
import { useUserContext } from "../../../context/UserContext";
import { useWishListContext } from "../../../context/WishlistContext";
import { removeAuthToken } from "../../../lib/cookies";
import DarkModeToggle from "../../common/DarkModeToggle";
import MenuNav from "../MenuNav/MenuNav";

const TopNav = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useUserContext();
  const { getUserCart } = useCartContext();
  const { getUserWishlist } = useWishListContext();

  //  handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  // handle logout (rm token and navigate to login )
  const handleLogout = () => {
    removeAuthToken();
    setUserProfile(null);
    navigate("/login");
    getUserCart();
    getUserWishlist();
    setIsMenuVisible(false);
  };

  return (
    <section className="top-nav text-white p-3">
      <div className="container-xl">
        <div className="row">
          <div className="col-md-6 d-flex gap-2">
            <p className="m-0 d-none d-md-flex">
              <BiLocationPlus className="mx-1" size={22} /> Mansoura
            </p>
            <span className="d-none d-md-block">||</span>
            <p className="m-0 d-none d-md-flex">
              <BiPhone className="mx-1" size={22} /> 0100803461
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-end gap-3 position-relative">
            <DarkModeToggle />
            <button className="my-0 d-flex justify-content-end bg-transparent border-0 text-light ">
              {userProfile?.user?.name || "Guest"}
              <BiSolidUserDetail
                onClick={handleMenuToggle}
                className="mx-1 close-menu"
                size={22}
                style={{ cursor: "pointer" }}
              />
            </button>

            {isMenuVisible && (
              <MenuNav
                userProfile={userProfile}
                handleLogout={handleLogout}
                setIsMenuVisible={setIsMenuVisible}
                isMenuVisible={isMenuVisible}
                handleMenuToggle={handleMenuToggle}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
