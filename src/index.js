import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import ProtectectedAdmin from "./components/auth/ProtectectedAdmin";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BrandManagement from "./components/layouts/Admin/BrandManagement/BrandManagement";
import CategoryManagement from "./components/layouts/Admin/CategoryManagement/CategoryManagement";
import MainAdmin from "./components/layouts/Admin/MainAdmin";
import OrdersManagement from "./components/layouts/Admin/OrdersManagement/OrdersManagement";
import ProductManagement from "./components/layouts/Admin/ProductManagement/ProductManagement";
import OrderPageUser from "./components/layouts/ProfileUser/OrderPage/OrderPage";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import BrandPage from "./pages/BrandPage/BrandPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CheckoutCashPage from "./pages/CheckoutCashPage/CheckoutCashPage";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AccountPage from "./pages/Profile/AccountPage/AccountPage";
import LayoutProfile from "./pages/Profile/LayoutProfile/LayoutProfile";
import Register from "./pages/Register/Register";
import ShopPage from "./pages/ShopPage/ShopPage";
import WishListPage from "./pages/WishListPage/WishListPage";

export {
  AccountPage,
  AdminLayout,
  BrandManagement,
  BrandPage,
  CartPage,
  CategoryManagement,
  CategoryPage,
  CheckoutCashPage,
  createHashRouter,
  Home,
  Layout,
  LayoutProfile,
  Login,
  MainAdmin,
  NotFoundPage,
  OrderPageUser,
  OrdersManagement,
  ProductDetails,
  ProductManagement,
  ProtectectedAdmin,
  ProtectedRoute,
  redirect,
  Register,
  RouterProvider,
  ShopPage,
  WishListPage,
};
