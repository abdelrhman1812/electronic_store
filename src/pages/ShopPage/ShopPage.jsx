import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../assets/style/shop.css";
import ProductNotFound from "../../components/layouts/ShopPage/ProductNotFound";
import SingleProduct from "../../components/layouts/ShopPage/Products/ProductDetails/SingleProduct";
import Sidebar from "../../components/layouts/ShopPage/Sidebar/Sidebar";
import TapFilter from "../../components/layouts/ShopPage/TapFilter";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { getProducts } from "../../services/Apis/shopApi/ShopApi";

const ShopPage = () => {
  const [showSidBar, setSidBar] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    category: [],
    brand: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9; // عدد المنتجات لكل صفحة

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setAllProducts(data?.products || []);
      setFilters({ minPrice: 0, maxPrice: 2000, category: [], brand: [] });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
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

  useEffect(() => {
    window.scrollTo(0, 0);

    if (allProducts.length > 0) {
      filterProducts(filters);
    }
  }, [filters, allProducts, filterProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [fetchProducts]);

  const showSidBarHandler = () => {
    setSidBar(!showSidBar);
  };

  // Pagination logic
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <section className="shop-page">
      <PageHeader title="Shop" />
      <div className="container-xl py-4">
        <div className="row mt-4">
          <Sidebar
            getAllProducts={setFilters}
            setIsLoading={setIsLoading}
            showSidBarHandler={showSidBarHandler}
            showSidBar={showSidBar}
          />

          <div className="col-lg-9">
            <TapFilter showSidBarHandler={showSidBarHandler} />
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

            {/* React Paginate */}
            {!isLoading && products.length > 0 && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
