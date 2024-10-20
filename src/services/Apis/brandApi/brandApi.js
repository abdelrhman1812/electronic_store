import clientApi from "../../clientApi";

const getBrands = async () => {
  const response = await clientApi.get("/brands");
  return response?.data;
};

export { getBrands };
