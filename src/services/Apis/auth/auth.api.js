import getAuthToken, { setAutCookie } from "../../../lib/cookies";
import clientApi from "../../clientApi";

const register = async (values) => {
  const response = await clientApi.post("/auth/register", values);
  // console.log("Registered", response);

  return response?.data;
};

const login = async (values) => {
  const response = await clientApi.post("/auth/login", values);
  // console.log("login", response);
  const token = response?.data?.token;
  console.log(token);

  if (!token) throw new Error("Invalid Credentials ");

  setAutCookie(token);

  return response?.data;
};

const getUserProfile = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No token found");
  const response = await clientApi.get("/users");
  // console.log(response.data);
  return response?.data;
};

export { getUserProfile, login, register };
