import getAuthToken from "../../../lib/cookies";
import clientApi from "../../clientApi";

const addToWishlist = async (productId) => {
  const response = await clientApi.post("/wishlist", { productId });
  return response?.data;
};

const deleteFromWishlist = async (productId) => {
  const response = await clientApi.delete(`/wishlist/${productId}`);
  return response?.data;
};

const clearWishlist = async () => {
  const response = await clientApi.put("/wishlist");
  return response?.data;
};

const getloggedInUserWishlist = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No token found");
  const response = await clientApi.get("/wishlist");
  return response?.data;
};
export {
  addToWishlist,
  clearWishlist,
  deleteFromWishlist,
  getloggedInUserWishlist,
};
