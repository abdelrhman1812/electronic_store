import clientApi from "../../clientApi";

const getBrands = async () => {
  const response = await clientApi.get("/brands");
  return response?.data;
};

const getSingleBrands = async (id) => {
  const response = await clientApi.get(`/brands/${id}`);
  return response?.data;
};

const addBrand = async (values) => {
  const response = await clientApi.post("/brands", values);
  return response;
};

const deleteBrand = async (brandId) => {
  const response = await clientApi.delete(`/brands/${brandId}`);
  return response;
};

const updateBrand = async (brandId, values) => {
  const response = await clientApi.put(`/brands/${brandId}`, values);
  return response;
};

export { addBrand, deleteBrand, getBrands, getSingleBrands, updateBrand };
