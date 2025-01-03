import {
  AccountPage,
  AddressPage,
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
  OrderPage,
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
} from "./index.js";

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
            { index: true, element: <OrderPage /> },
            { path: "order", element: <OrderPage /> },
            { path: "address", element: <AddressPage /> },
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
        { path: "productList", element: <ProductManagement /> },
        { path: "brandList", element: <BrandManagement /> },
        { path: "categoryList", element: <CategoryManagement /> },
        { path: "ordersList", element: <OrdersManagement /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default Routes;
