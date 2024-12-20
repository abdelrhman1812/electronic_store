import clientApi from "../../clientApi";

const addReviews = async (values, productId) => {
  const response = await clientApi.post(
    `/products/${productId}/reviews/`,
    values
  );

  return response?.data;
};

const getReviews = async () => {
  const response = await clientApi.get(`/reviews`);
  return response;
};

export { addReviews, getReviews };
