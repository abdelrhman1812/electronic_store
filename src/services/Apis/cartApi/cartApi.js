import getAuthToken from "../../../lib/cookies";
import clientApi from "../../clientApi";

const addToCart = async (productId) => {
  const response = await clientApi.post("/cart", { productId });
  return response?.data;
};

const updateCart = async (productId, quantity) => {
  const response = await clientApi.put(`/cart/${productId}`, { quantity });
  return response?.data;
};

const deleteCartItem = async (productId) => {
  const response = await clientApi.delete(`/cart/${productId}`);
  return response?.data;
};

const clearCart = async () => {
  const response = await clientApi.put("/cart");
  return response?.data;
};

const getloggedInUserCart = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No token found");
  const response = await clientApi.get("/cart");
  return response?.data;
};
export {
  addToCart,
  clearCart,
  deleteCartItem,
  getloggedInUserCart,
  updateCart,
};
