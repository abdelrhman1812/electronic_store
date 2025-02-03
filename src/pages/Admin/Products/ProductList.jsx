import StarRating from "../../../components/common/StarRating";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import useAddProduct from "../../../components/layouts/Admin/ProductManagement/useAddProduct";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";

const ProductList = () => {
  const { products, handleDeleteProduct } = useAddProduct();

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
      custom: (item) => <StarRating rate={item?.rateNum} maxStars={5} />,
    },
    {
      key: "imageCover",
      name: "image",
    },
  ];

  const handleDelete = (id) => {
    handleDeleteProduct(id);
  };

  return (
    <div className="product-list position-relative">
      <PageHeader title="Product" />

      <div className="container-xl my-5">
        <DynamicTable onDelete={handleDelete} header={header} data={products} />
      </div>

      {/* {selectedProduct && (
        <div className="overlay" onClick={handleCloseOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseOverlay}>
              X
            </button>
            <h3>{selectedProduct.title}</h3>
            <img
              src={selectedProduct.imageCover.secure_url}
              alt={selectedProduct.title}
              className="overlay-image"
            />
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <StarRating rate={selectedProduct?.rateNum} maxStars={5} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductList;
