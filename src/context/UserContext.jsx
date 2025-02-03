import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/Apis/auth/auth.api";

// blueprint for auto complete && is useful when using typeScript
const UserContext = createContext({
  userProfile: {},
  isLoading: false,
  isError: null,
  getUser: () => {},
});

export const UserProvider = ({ children }) => {
  /* States  */
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  /* Function to get and set user */
  const getUser = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await getUserProfile();
      setUserProfile(data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ userProfile, isLoading, isError, getUser, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUserContext = () => {
  return useContext(UserContext);
};
