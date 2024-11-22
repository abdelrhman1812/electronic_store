import clientApi from "../../clientApi";

const addReviews = async (values, productId) => {
  const response = await clientApi.post(
    `/products/${productId}/reviews/`,
    values
  );

  return response?.data;
};

export { addReviews };
