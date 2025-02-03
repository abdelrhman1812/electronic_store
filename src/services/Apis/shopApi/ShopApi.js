import clientApi from "../../clientApi";

const getProducts = async () => {
  const response = await clientApi.get(`/products`);
  return response?.data;
};

export { getProducts };
