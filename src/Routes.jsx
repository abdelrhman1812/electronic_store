import {
  AccountPage,
  AdminLayout,
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
  ProtectectedAdmin,
  ProtectedRoute,
  redirect,
  Register,
  RouterProvider,
  ShopPage,
  WishListPage,
} from "./index.js";
import BrandList from "./pages/Admin/Brands/BrandList.jsx";
import BrandsLayout from "./pages/Admin/Brands/BrandsLayout.jsx";
import FormAddBrand from "./pages/Admin/Brands/FormAddBrand.jsx";
import UpdateBrand from "./pages/Admin/Brands/updateBrand.jsx";
import AddProduct from "./pages/Admin/Products/AddProduct.jsx";
import ProductList from "./pages/Admin/Products/ProductList.jsx";
import ProductsLayout from "./pages/Admin/Products/ProductsLayout.jsx";

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
        { path: "cart", element: <CartPage /> },
        { path: "category/:category", element: <CategoryPage /> },
        { path: "wishlist", element: <WishListPage /> },
        { path: "checkout-cash", element: <CheckoutCashPage /> },
        { path: "product/:id", element: <ProductDetails /> },
        {
          path: "register",
          element: (
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          ),
        },

        {
          path: "login",
          element: (
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: <LayoutProfile />,
          children: [
            { index: true, element: <OrderPageUser /> },
            { path: "order", element: <OrderPageUser /> },
            { path: "account", element: <AccountPage /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    {
      path: "admin",
      element: (
        <ProtectectedAdmin>
          <AdminLayout />
        </ProtectectedAdmin>
      ),
      children: [
        { index: true, element: <MainAdmin /> },
        {
          path: "products",
          element: <ProductsLayout />,
          children: [
            { index: true, element: <ProductList /> },
            { path: "add", element: <AddProduct /> },
          ],
        },

        {
          path: "brands",
          element: <BrandsLayout />,
          children: [
            { index: true, element: <BrandList /> },
            { path: "add", element: <FormAddBrand /> },
            { path: ":id", element: <UpdateBrand /> },
          ],
        },
        // { path: "addBrand", element: <FormAddBrand /> },
        { path: "categoryList", element: <CategoryManagement /> },
        { path: "ordersList", element: <OrdersManagement /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default Routes;
