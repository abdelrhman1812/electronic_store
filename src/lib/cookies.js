import Cookies from "js-cookie";
const TOKEN_NAME = "AUTH_TOKEN";
const setAutCookie = (token) =>
  Cookies.set(TOKEN_NAME, token, {
    expires: 1,
  });

const getAuthToken = () => {
  return Cookies.get(TOKEN_NAME);
};

const checkAuthToken = () => {
  return !!getAuthToken();
};

const removeAuthToken = () => {
  Cookies.remove(TOKEN_NAME);
};

export default getAuthToken;

export { checkAuthToken, removeAuthToken, setAutCookie };
