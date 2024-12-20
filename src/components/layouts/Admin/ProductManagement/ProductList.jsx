import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import IsLoading from "../../../shared/IsLoading/IsLoading";
import PageHeader from "../../../shared/PageHeader/PageHeader";
import StarRating from "../../Products/StarRating";

const ProductList = ({ handleDeleteProduct, products, loading }) => {
  // const { products } = useData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseOverlay = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list position-relative">
      <PageHeader title="Product" />

      <div className="container-xl my-5">
        <table className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading.fetch && (
              <tr>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
                <td>
                  <IsLoading width={100} height={100} />
                </td>
              </tr>
            )}
            {products?.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.imageCover.secure_url}
                    alt={product.title}
                    onClick={() => handleProductClick(product)}
                  />
                </td>
                <td>{product?.title}</td>
                <td>${product.price}</td>
                <td>
                  <StarRating rate={product?.rateNum} maxStars={5} />
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <BiEdit size={20} className="text-primary" />
                    <BiTrash
                      size={20}
                      className="text-danger"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
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
      )}
    </div>
  );
};

export default ProductList;
