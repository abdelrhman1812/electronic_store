import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { UserProvider } from "./context/UserContext";
import { WishListProvider } from "./context/WishlistContext";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              {/* <DarkModeProvider> */}
              <Routes />
              <ToastContainer />
              {/* </DarkModeProvider> */}
            </WishListProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
