import { createContext, useContext, useEffect, useState } from "react";
import {
  addToWishlist,
  deleteFromWishlist,
  getloggedInUserWishlist,
} from "../services/Apis/wishlistApi/wishlistApi";

const WishListContext = createContext({
  wishList: [],
  wishListLength: 0,
  isLoading: false,
  isErrors: null,
  addProductToWishList: () => {},
  getUserWishlist: () => {},
  deleteProductFromWishlist: () => {},
});

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [wishListLength, setWishListLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsError] = useState(null);

  /* Function to add product to wishlist */
  const addProductToWishList = async (productId) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await addToWishlist(productId);
      if (data?.wishlist) {
        setWishList(data.wishlist.products || []);
        setWishListLength(data.wishlist.products?.length || 0);
      }
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to delete product from wishlist */
  const deleteProductFromWishlist = async (productId) => {
    // setIsLoading(true);
    setIsError(null);
    try {
      const data = await deleteFromWishlist(productId);
      if (data?.wishlist) {
        setWishList(data.wishlist.products || []);
        setWishListLength(data.wishlist.products?.length || 0);
      }
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to get user wishlist */
  const getUserWishlist = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await getloggedInUserWishlist();
      if (data?.wishlist) {
        setWishList(data.wishlist.products || []);
        setWishListLength(data.wishlist.products?.length || 0);
      }
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to fetch wishlist.");
      setWishList([]);
      setWishListLength(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        wishListLength,
        isLoading,
        isErrors,
        addProductToWishList,
        getUserWishlist,
        deleteProductFromWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContext;

export const useWishListContext = () => {
  return useContext(WishListContext);
};
