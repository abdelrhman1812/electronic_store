import { useCallback, useEffect, useState } from "react";
import "../../assets/style/shop.css";
import ProductNotFound from "../../components/layouts/Products/ProductNotFound";
import SingleProduct from "../../components/layouts/Products/SingleProduct";
import TapFilter from "../../components/layouts/Products/TapFilter";
import Sidebar from "../../components/layouts/Sidebar/Sidebar";
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

  // Store all products to filter
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

  // Filter products when filters change
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

  // Toggle sidebar visibility
  const showSidBarHandler = () => {
    setSidBar(!showSidBar);
  };

  return (
    <section className="shop-page">
      {/* Page Header */}
      <PageHeader title="Shop" />
      <div className="container-xl py-4">
        <div className="row mt-4">
          {/* Sidebar */}
          <Sidebar
            getAllProducts={setFilters}
            setIsLoading={setIsLoading}
            showSidBarHandler={showSidBarHandler}
            showSidBar={showSidBar}
          />

          <div className="col-lg-9">
            {/* Some Of Filter  */}
            <TapFilter showSidBarHandler={showSidBarHandler} />
            <div className="row g-3">
              {/* Products */}
              {isLoading && <IsLoading columns={3} count={12} />}
              {!isLoading && products.length === 0 ? (
                <ProductNotFound />
              ) : (
                products.map((product) => (
                  <div key={product._id} className="col-md-6 col-lg-4">
                    <SingleProduct product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
