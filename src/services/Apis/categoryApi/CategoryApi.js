import clientApi from "../../clientApi";
import { getProducts } from "../productApi/ProductApi";

const getCategories = async () => {
  const response = await clientApi.get("/categories");
  return response?.data;
};

const getProductsByCategory = async (slug) => {
  const data = await getProducts();

  return data.products?.filter((product) => product?.category?.slug === slug);
};

export { getCategories, getProductsByCategory };
