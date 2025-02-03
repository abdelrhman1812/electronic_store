import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  deleteCartItem,
  getloggedInUserCart,
  updateCart,
} from "../services/Apis/cartApi/cartApi";

// Blueprint for auto-complete; useful when using TypeScript
const CartContext = createContext({
  cart: [],
  cartLength: 0,
  totalPrice: 0,
  isLoading: false,
  isError: null,
  addProductToCart: () => {},
  getUserCart: () => {},
  updateQuantityOfProduct: () => {},
  deleteItemFromCart: () => {},
  clearUserCart: () => {},
  cartId: null,
});

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  /* Function to add product to cart */
  const addProductToCart = async (productId) => {
    setIsLoading(true);
    setIsError(null);
    try {
      await addToCart(productId);
      await getUserCart(); // Refresh cart after adding
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to update quantity of product in cart */
  const updateQuantityOfProduct = async (productId, quantity) => {
    // setIsLoading(true);
    setIsError(null);
    try {
      const data = await updateCart(productId, quantity);
      if (data?.cart) {
        setCart(data.cart.products || []);
        setCartLength(data.cart.products?.length || 0);
        setTotalPrice(data.cart.totalCartPrice || 0);
      }
      return data;
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to delete item from cart */

  const deleteItemFromCart = async (productId) => {
    // setIsLoading(true);
    setIsError(null);
    try {
      const data = await deleteCartItem(productId);
      if (data?.cart) {
        setCart(data.cart.products || []);
        setCartLength(data.cart.products?.length || 0);
        setTotalPrice(data.cart.totalCartPrice || 0);
      }
      return data;
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to get user cart */
  const getUserCart = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await getloggedInUserCart();
      if (data?.cart) {
        setCartId(data.cart._id || null);
        setTotalPrice(data.cart.totalCartPrice || 0);
        setCart(data.cart.products || []);
        setCartLength(data.cart.products?.length || 0);
      }
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to fetch cart.");
      setCart([]);
      setCartLength(0);
    } finally {
      setIsLoading(false);
    }
  };

  /* Function to clear cart */

  const clearUserCart = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const data = await clearCart();
      if (data?.cart) {
        setCart(data.cart.products || []);
        setCartLength(data.cart.products?.length || 0);
        setTotalPrice(data.cart.totalCartPrice || 0);
      }
      return data;
    } catch (error) {
      setIsError(error.response?.data?.message || "Failed to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      await getUserCart();
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength,
        isLoading,
        isError,
        addProductToCart,
        getUserCart,
        setCart,
        totalPrice,
        updateQuantityOfProduct,
        deleteItemFromCart,
        clearUserCart,
        cartId,
        setCartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

// Custom hook for using CartContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  return useContext(CartContext);
};
