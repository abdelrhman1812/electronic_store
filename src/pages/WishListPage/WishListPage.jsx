import { Helmet } from "react-helmet";
import SingleProduct from "../../components/layouts/ShopPage/Products/ProductDetails/SingleProduct";
import Empty from "../../components/shared/Empty/Empty";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWishListContext } from "../../context/WishlistContext";

const WishListPage = () => {
  const { wishList, isLoading } = useWishListContext();

  const renderLoading = () => (
    <div className="container-xl">
      <div className="row mx-0 mt-3 g-3">
        <IsLoading count={4} columns={3} />
      </div>
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
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <section className="wishlist overflow-hidden">
        <PageHeader title="WishList" />
        {isLoading
          ? renderLoading()
          : wishList.length === 0
          ? renderEmptyState()
          : renderWishList()}
      </section>
    </>
  );
};

export default WishListPage;
