import clientApi from "../../clientApi";

const getProducts = async () => {
  const response = await clientApi.get("/products");
  return response?.data;
};

const getProductSpecific = async (productId) => {
  const response = await clientApi.get(`/products/${productId}`);
  return response?.data;
};

const getRelatedProducts = async (name, excludedProductName) => {
  const data = await getProducts();
  const relatedProducts = data.products?.filter(
    (product) =>
      product?.category?.name === name && product?.title !== excludedProductName
  );

  return relatedProducts;
};

const searchProducts = async (title) => {
  const response = await clientApi.get(`/products?search=${title}`);
  return response?.data;
};

const addProduct = async (values) => {
  const response = await clientApi.post("/products", values);
  return response;
};

const deleteProduct = async (productId) => {
  const response = await clientApi.delete(`/products/${productId}`);
  return response;
};

const updateProduct = async (productId, values) => {
  const response = await clientApi.put(`/products/${productId}`, values);
  return response;
};

export {
  addProduct,
  deleteProduct,
  getProducts,
  getProductSpecific,
  getRelatedProducts,
  searchProducts,
  updateProduct,
};
