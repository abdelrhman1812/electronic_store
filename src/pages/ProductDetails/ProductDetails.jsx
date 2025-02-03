import { Helmet } from "react-helmet";
import {
  getProductSpecific,
  getRelatedProducts,
  ImagesSpecificProduct,
  IsLoading,
  PageHeader,
  ProductData,
  ProductTabs,
  RelatedProduct,
  useCallback,
  useEffect,
  useParams,
  useState,
} from "./index";
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { id } = useParams();

  // Fetch specific product and related products using the id from the URL params
  const getSpecificProduct = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProductSpecific(id);
      setProduct(data?.product || {});

      const relatedProductData = await getRelatedProducts(
        data?.product?.category?.name,
        data?.product?.title
      );

      setRelatedProduct(relatedProductData || []);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // side effects for product
  useEffect(() => {
    window.scrollTo(0, 0);

    getSpecificProduct();
  }, [getSpecificProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateProductReviews = async () => {
    const data = await getProductSpecific(id);
    setProduct(data?.product || {});
  };

  return (
    <>
      <Helmet>
        <title>{product?.title || "Product Details"}</title>
      </Helmet>
      <section className="product-details overflow-hidden">
        {/* Page Header */}
        <PageHeader title={product?.title || "Product Details"} />
        <div className="container-xl py-5">
          <div className="row g-5">
            {/* Product Images */}
            <div className="col-lg-6">
              <ImagesSpecificProduct product={product} loading={loading} />
            </div>

            {/* Product Data */}
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <ProductData product={product} loading={loading} />
            </div>
          </div>
          <hr style={{ color: "#a0a2a2f7", margin: "40px 0" }} />

          {/* Other Product data */}
          <div className="row overflow-hidden">
            <div className="product-taps">
              {loading ? (
                <IsLoading count={1} columns={3} width={100} />
              ) : (
                <ProductTabs
                  product={product}
                  setProduct={setProduct}
                  updateProductReviews={updateProductReviews}
                />
              )}
            </div>
          </div>

          {/* Related Product */}

          <div className="row my-5">
            <RelatedProduct relatedProduct={relatedProduct} loading={loading} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
