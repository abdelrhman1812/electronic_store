import SingleReview from "../../Products/ProductDetails/ProductReview//SingleReview";
import AddReviews from "../../Products/ProductDetails/ProductReview/AddReviews";

const TabContent = ({ activeTab, product, updateProductReviews }) => {
  return (
    <div className="tab-content  " id="product-tabContent">
      {activeTab === "description" && (
        <div className="tab-pane active px-3" id="description" role="tabpanel">
          <h2>{product?.title}</h2>
          <p className="m-0 ">{product?.description}</p>
        </div>
      )}
      {activeTab === "reviews" && (
        <div className="tab-pane reviews active" id="reviews" role="tabpanel">
          <div className="tab-pane reviews active" id="reviews" role="tabpanel">
            {product?.reviews?.map((review) => (
              <SingleReview
                key={review._id}
                review={review}
                rate={product?.rateNum}
              />
            ))}

            <AddReviews
              productId={product?._id}
              updateProductReviews={updateProductReviews}
            />
          </div>
        </div>
      )}
      {activeTab === "shipping-returns" && (
        <div className="tab-pane active" id="shipping-returns" role="tabpanel">
          <h6>Shipping & Returns.</h6>
          <p>
            getProductSpecific, getRelatedProducts, ImagesSpecificProduct,
            IsLoading, PageHeader, ProductData, ProductTabs, RelatedProduct,
            useCallback, useEffect, useParams, useState,
          </p>
          <h6>Returns & Refunds</h6>
          <p>
            We have a 14-day return policy, which means you have 14 days after
            receiving your item to request a return, To be eligible for a
            return, your item must be in the same condition that you received
            it, unused, and in its original packaging. You’ll also need the
            order confirmation, order number, or proof of purchase. We will
            notify you once we’ve received and inspected your return, and let
            you know if the refund was approved or not. If approved, you’ll be
            automatically refunded on your original payment method. Please
            remember it can take some time for your bank or credit card company
            to process and post the refund too.
          </p>
        </div>
      )}
      {activeTab === "faq" && (
        <div className="tab-pane active" id="faq" role="tabpanel">
          <p>FAQ content...</p>
        </div>
      )}
    </div>
  );
};

export default TabContent;
