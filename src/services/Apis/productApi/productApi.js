import clientApi from "../../clientApi";

const getProducts = async () => {
  try {
    const response = await clientApi.get("/products");
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getProductSpecific = async (productId) => {
  try {
    const response = await clientApi.get(`/products/${productId}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getRelatedProducts = async (name, excludedProductName) => {
  try {
    const data = await getProducts();
    const relatedProducts = data.products?.filter(
      (product) =>
        product?.category?.name === name &&
        product?.title !== excludedProductName
    );

    return relatedProducts;
  } catch (error) {
    throw error;
  }
};

const searchProducts = async (title) => {
  try {
    const response = await clientApi.get(`/products?search=${title}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (values) => {
  const response = await clientApi.post("/products", values);
  return response;
};

const deleteProduct = async (productId) => {
  const response = await clientApi.delete(`/products/${productId}`);
  return response;
};

export {
  addProduct,
  deleteProduct,
  getProducts,
  getProductSpecific,
  getRelatedProducts,
  searchProducts,
};
