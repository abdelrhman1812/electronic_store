import { WindowSizeProvider } from "./context/WindowSizeContext.jsx";
import {
  AccountPage,
  AdminLayout,
  BrandPage,
  CartPage,
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
import CategoryLayout from "./pages/Admin/Categories/CategoryLayout.jsx";
import CategoryList from "./pages/Admin/Categories/CategoryList.jsx";
import FormAddCategory from "./pages/Admin/Categories/FormAddCategory.jsx";
import UpdateCategory from "./pages/Admin/Categories/UpdateCategory.jsx";
import AddProduct from "./pages/Admin/Products/AddProduct.jsx";
import ProductList from "./pages/Admin/Products/ProductList.jsx";
import ProductsLayout from "./pages/Admin/Products/ProductsLayout.jsx";
import UpdateProduct from "./pages/Admin/Products/updateProduct.jsx";

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
          <WindowSizeProvider>
            <AdminLayout />
          </WindowSizeProvider>
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
            { path: ":id", element: <UpdateProduct /> },
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
        {
          path: "categories",
          element: <CategoryLayout />,
          children: [
            { index: true, element: <CategoryList /> },
            { path: "add", element: <FormAddCategory /> },
            { path: ":id", element: <UpdateCategory /> },
          ],
        },
        { path: "ordersList", element: <OrdersManagement /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default Routes;
