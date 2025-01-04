import { useCallback, useMemo, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useWishListContext } from "../../context/WishlistContext";
import { checkAuthToken } from "../../lib/cookies";
import notify from "../../lib/notify";

const useProductAction = (product) => {
  const { addProductToCart } = useCartContext();
  const { addProductToWishList, deleteProductFromWishlist, wishList } =
    useWishListContext();

  const isAuthenticated = useMemo(() => checkAuthToken(), []);
  const [inWishlist, setInWishlist] = useState(() =>
    product ? wishList?.some((item) => item._id === product._id) : false
  );

  const notifyUser = useCallback((type, message) => notify(type, message), []);

  const handleAddToWishList = useCallback(() => {
    if (!isAuthenticated)
      return notifyUser("error", "You need to be logged in");
    if (!product) return;

    addProductToWishList(product._id);
    setInWishlist(true);
    notifyUser("success", "Success! Product added to wishlist");
  }, [isAuthenticated, addProductToWishList, product, notifyUser]);

  const handleDeleteFromWishList = useCallback(() => {
    if (!isAuthenticated)
      return notifyUser("error", "You need to be logged in");
    if (!product) return;

    deleteProductFromWishlist(product._id);
    setInWishlist(false);
    notifyUser("success", "Product removed from wishlist");
  }, [isAuthenticated, deleteProductFromWishlist, product, notifyUser]);

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated)
      return notifyUser("error", "You need to be logged in");
    if (!product) return;

    addProductToCart(product._id);
    notifyUser("success", "Success! Product added to cart");
  }, [isAuthenticated, addProductToCart, product, notifyUser]);

  return {
    handleAddToWishList,
    handleDeleteFromWishList,
    handleAddToCart,
    inWishlist,
  };
};

export default useProductAction;
