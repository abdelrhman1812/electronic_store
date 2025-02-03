import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { useWishListContext } from "../context/WishlistContext";
import { checkAuthToken, removeAuthToken } from "./cookies";
import notify from "./notify";

const useHandleLogout = () => {
  const { setUserProfile } = useUserContext();
  const { getUserCart } = useCartContext();
  const { getUserWishlist } = useWishListContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken(); // Remove the token first
    if (!checkAuthToken()) {
      notify("success", "Logout successfully");
      setUserProfile(null); // Clear user profile
      getUserCart(); // Refresh user cart
      getUserWishlist(); // Refresh user wishlist
      navigate("/login"); // Redirect to login
    } else {
      //   console.error("Failed to remove authentication token."); // Log error if token still exists
    }
  };

  return {
    handleLogout,
  };
};

export default useHandleLogout;
