import IsLoading from "../../../../shared/IsLoading/IsLoading";
import SectionTitle from "../../../../shared/SectionTitle/SectionTitle";
import SingleProduct from "./SingleProduct";

const RelatedProduct = ({ relatedProduct, loading }) => {
  return (
    <>
      <SectionTitle title="Related Products" />
      {loading ? (
        <IsLoading count={4} columns={4} />
      ) : (
        <>
          {relatedProduct?.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              <SingleProduct product={product} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default RelatedProduct;
