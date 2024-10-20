import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { WishListProvider } from "./context/WishlistContext";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <WishListProvider>
            <Routes />
            <ToastContainer />
          </WishListProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
};

export default App;
