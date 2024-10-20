import SingleProduct from "../../components/layouts/Products/SingleProduct";
import Empty from "../../components/shared/Empty/Empty";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useWishListContext } from "../../context/WishlistContext";

const WishListPage = () => {
  const { wishList } = useWishListContext();

  return (
    <section className="wishlist overflow-hidden">
      <PageHeader title={"WishList"} />
      {wishList.length === 0 && (
        <Empty title="Your wish list is empty" description="Start shopping" />
      )}

      <div className="container-xl py-4">
        <div className="row py-4 g-3 ">
          {wishList?.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishListPage;
