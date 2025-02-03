import { useCallback, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import ReactResponsivePagination from "react-responsive-pagination";
import "../../assets/style/shop.css";
import ProductNotFound from "../../components/layouts/ShopPage/ProductNotFound";
import SingleProduct from "../../components/layouts/ShopPage/Products/ProductDetails/SingleProduct";
import Sidebar from "../../components/layouts/ShopPage/Sidebar/Sidebar";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { getProducts } from "../../services/Apis/shopApi/ShopApi";

const ShopPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    category: [],
    brand: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setAllProducts(data?.products || []);
      setFilters({ minPrice: 0, maxPrice: 2000, category: [], brand: [] });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter products
  const filterProducts = useCallback(
    (values) => {
      const filteredProducts = allProducts.filter((product) => {
        const isInCategory =
          values.category.length === 0 ||
          values.category.includes(product.category.slug);
        const isInBrand =
          values.brand.length === 0 ||
          values.brand.includes(product.brand.name);
        const isInPriceRange =
          product.price >= values.minPrice && product.price <= values.maxPrice;

        return isInCategory && isInBrand && isInPriceRange;
      });
      setProducts(filteredProducts);
    },
    [allProducts]
  );

  // Effects for filtering
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (allProducts.length > 0) {
      filterProducts(filters);
    }
  }, [filters, allProducts, filterProducts]);

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <section className="shop-page">
      <PageHeader title="Shop" />
      <div className="container-xl py-4">
        <div className="row mt-4">
          <Sidebar
            getAllProducts={setFilters}
            setIsLoading={setIsLoading}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
          />

          <div className="col-lg-9">
            <div className="d-flex align-items-center justify-content-end my-3 py-2 px-1">
              <button
                className="d-flex align-items-center border-0 d-block d-lg-none rounded-1"
                onClick={toggleSidebar}
              >
                <BiMenu className="text-primary" size={35} />
              </button>
            </div>

            <div className="row g-3">
              {isLoading && <IsLoading columns={3} count={12} />}
              {!isLoading && currentProducts.length === 0 ? (
                <ProductNotFound />
              ) : (
                currentProducts.map((product) => (
                  <div key={product._id} className="col-md-6 col-lg-4">
                    <SingleProduct product={product} />
                  </div>
                ))
              )}
            </div>

            {!isLoading && products.length > 0 && (
              <div className="py-5">
                <ReactResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
