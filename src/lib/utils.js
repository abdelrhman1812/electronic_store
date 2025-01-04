import { checkAuthToken } from "./cookies";

export const handleAddToCart = (productId, addProductToCart, notifyAuth) => {
  const isAuthenticated = checkAuthToken();
  if (!isAuthenticated) return notifyAuth("error", "You need to be logged in");

  addProductToCart(productId);
  notifyAuth("success", "Success! Product added to cart");
};

export const handleAddToWishList = (
  productId,
  addProductToWishList,
  setInWishlist,
  notifyAuth
) => {
  const isAuthenticated = checkAuthToken();
  if (!isAuthenticated) return notifyAuth("error", "You need to be logged in");

  addProductToWishList(productId);
  setInWishlist(true);
  notifyAuth("success", "Success! Product added to wishlist");
};

export const handleDeleteFromWishList = (
  productId,
  deleteProductFromWishlist,
  setInWishlist,
  notifyAuth
) => {
  const isAuthenticated = checkAuthToken();
  if (!isAuthenticated) return notifyAuth("error", "You need to be logged in");

  deleteProductFromWishlist(productId);
  setInWishlist(false);
  notifyAuth("success", "Product removed from wishlist");
};
