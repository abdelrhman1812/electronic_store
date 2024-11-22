import SingleProduct from "../../components/layouts/Products/SingleProduct";
import Empty from "../../components/shared/Empty/Empty";
import ErrorMsg from "../../components/shared/ErrorMsg/ErrorMsg";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWishListContext } from "../../context/WishlistContext";

const WishListPage = () => {
  const { wishList, isLoading, isErrors } = useWishListContext();

  const renderLoading = () => (
    <div className="container-xl">
      <div className="row mx-0 mt-3 g-3">
        <IsLoading count={4} columns={3} />
      </div>
    </div>
  );

  const renderError = () => (
    <div className="error-message text-center">
      <ErrorMsg error=" Must be login and There was an error loading your wish list. Please try again later " />
    </div>
  );

  const renderEmptyState = () => (
    <Empty title="Your wish list is empty" description="Start shopping" />
  );

  const renderWishList = () => (
    <div className="container-xl py-4">
      <div className="row py-4 g-3">
        {wishList.map((product) => (
          <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
            <SingleProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="wishlist overflow-hidden">
      <PageHeader title="WishList" />
      {isLoading
        ? renderLoading()
        : isErrors
        ? renderError()
        : wishList.length === 0
        ? renderEmptyState()
        : renderWishList()}
    </section>
  );
};

export default WishListPage;
