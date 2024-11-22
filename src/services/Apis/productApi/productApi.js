import clientApi from "../../clientApi";

const getProducts = async () => {
  try {
    const response = await clientApi.get("/products");
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getProductSpecific = async (productId) => {
  try {
    const response = await clientApi.get(`/products/${productId}`);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

const getRelatedProducts = async (name, excludedProductName) => {
  try {
    const data = await getProducts();
    console.log(excludedProductName);
    const relatedProducts = data.products?.filter(
      (product) =>
        product?.category?.name === name &&
        product?.title !== excludedProductName
    );

    return relatedProducts;
  } catch (error) {
    console.error(`Error fetching products :`, error);
    throw error;
  }
};

const searchProducts = async (title) => {
  try {
    const response = await clientApi.get(`/products?search=${title}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { getProductSpecific, getProducts, getRelatedProducts, searchProducts };
