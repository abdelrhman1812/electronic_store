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

export { getProductSpecific, getProducts };
