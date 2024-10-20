import clientApi from "../../clientApi";

const getProducts = async () => {
  const response = await clientApi.get(`/products`);
  //   console.log(response);
  return response?.data;
};

export { getProducts };
