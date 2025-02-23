import clientApi from "../../clientApi";
import { getProducts } from "../productApi/productApi";

const getCategories = async () => {
  const response = await clientApi.get("/categories");
  return response?.data;
};

const getProductsByCategory = async (slug) => {
  const data = await getProducts();
  return data.products?.filter((product) => product?.category?.slug === slug);
};

const getSingleCategory = async (id) => {
  const response = await clientApi.get(`/categories/${id}`);
  return response?.data;
};
const deleteSingleCategory = async (categoryId) => {
  const response = await clientApi.get(`/categories/${categoryId}`);
  return response;
};

const addCategory = async (values) => {
  const response = await clientApi.post("/categories", values);
  return response;
};

const deleteCategory = async (categoryId) => {
  const response = await clientApi.delete(`/categories/${categoryId}`);
  return response;
};

const updateCategory = async (categoryId, values) => {
  const response = await clientApi.put(`/categories/${categoryId}`, values);
  return response;
};

export {
  addCategory,
  deleteCategory,
  deleteSingleCategory,
  getCategories,
  getProductsByCategory,
  getSingleCategory,
  updateCategory,
};
