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
    maxPrice: 100000,
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
      const fetchedProducts = data?.products || [];
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts); // Initialize products immediately
      setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 100000 }));
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
          (product.category?.slug && values.category.includes(product.category.slug));
        const isInBrand =
          values.brand.length === 0 ||
          (product.brand?.slug && values.brand.includes(product.brand.slug));
        const isInPriceRange =
          product.price >= values.minPrice && product.price <= values.maxPrice;

        return isInCategory && isInBrand && isInPriceRange;
      });
      setProducts(filteredProducts);
    },
    [allProducts],
  );
  // Effects for filtering
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    filterProducts(filters);
  }, [filters, allProducts, filterProducts]);

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
            <div className="shop-content-header d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
              <div className="product-count text-muted">
                Showing <span className="text-dark fw-bold">{currentProducts.length}</span> of <span className="text-dark fw-bold">{products.length}</span> products
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <button
                  className="d-flex align-items-center gap-2 border-0 bg-primary-subtle text-primary py-2 px-3 d-lg-none rounded-pill fw-bold transition-all"
                  onClick={toggleSidebar}
                >
                  <BiMenu size={24} />
                  Filters
                </button>
              </div>
            </div>

            <div className="row g-4">
              {isLoading && <IsLoading columns={3} count={12} />}
              {!isLoading && currentProducts.length === 0 ? (
                <div className="col-12 mt-5">
                  <ProductNotFound />
                </div>
              ) : (
                currentProducts.map((product) => (
                  <div key={product._id} className="col-md-6 col-lg-4">
                    <SingleProduct product={product} />
                  </div>
                ))
              )}
            </div>

            {!isLoading && totalPages > 1 && (
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
