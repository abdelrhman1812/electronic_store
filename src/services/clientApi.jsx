import axios from "axios";
import getAuthToken from "../lib/cookies";

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
});

clientApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientApi;
