import clientApi from "../../clientApi";

const checkoutCash = async (cartId, shoppingAddress) => {
  const response = await clientApi.post(`/orders/${cartId}`, {
    shoppingAddress,
  });
  return response?.data;
};

const getUserOrders = async () => {
  const response = await clientApi.get(`/orders`);
  return response?.data;
};

const deleteOrder = async (id) => {
  const response = await clientApi.delete(`/orders/${id}`);
  return response?.data;
};

export { checkoutCash, deleteOrder, getUserOrders };
