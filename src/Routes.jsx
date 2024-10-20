import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import BrandPage from "./pages/BrandPage/BrandPage";
import { Cart } from "./pages/Cart/Cart";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CheckoutCashPage from "./pages/CheckoutCashPage/CheckoutCashPage";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AccountPage from "./pages/Profile/AccountPage/AccountPage";
import AddressPage from "./pages/Profile/AddressPage/AddressPage";
import LayoutProfile from "./pages/Profile/LayoutProfile/LayoutProfile";
import OrderPage from "./pages/Profile/OrderPage/OrderPage";
import Register from "./pages/Register/Register";
import ShopPage from "./pages/ShopPage/ShopPage";
import WishListPage from "./pages/WishListPage/WishListPage";

const Routes = () => {
  const routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, loader: () => redirect("home") },

        { path: "home", element: <Home /> },
        { path: "shop", element: <ShopPage /> },
        { path: "brands", element: <BrandPage /> },
        { path: "cart", element: <Cart /> },
        { path: "/:category", element: <CategoryPage /> },
        { path: "wishlist", element: <WishListPage /> },
        { path: "checkout-cash", element: <CheckoutCashPage /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "profile",
          element: <LayoutProfile />,
          children: [
            { index: true, element: <OrderPage /> },
            { path: "order", element: <OrderPage /> },
            { path: "address", element: <AddressPage /> },
            { path: "account", element: <AccountPage /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    { path: "admin", element: <AdminLayout /> },
  ]);

  return <RouterProvider router={routers} />;
};

export default Routes;
