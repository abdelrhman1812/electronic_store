import { FaTrash } from "react-icons/fa";

const CartItem = ({
  product,
  handleUpdateQuantity,
  handleDeleteItem,
  isLoading,
}) => {
  return (
    <>
      <div
        className="row px-2 py-3 my-3 rounded-2 cart-item  "
        key={product.productId._id}
      >
        <div className="col-md-8 d-flex  gap-3 ">
          <figure className="m-0">
            <img
              src={product?.productId?.imageCover?.secure_url}
              alt={product.productId.title}
            />
          </figure>
          <div className="product-data">
            <h4>
              <strong>{product.productId.title}</strong>
            </h4>
            <p className="fw-bold item-price">${product.productId.price}</p>
          </div>
        </div>

        <div className="col-md-4 flex-column d-flex align-items-end  justify-content-between">
          <FaTrash onClick={() => handleDeleteItem(product.productId._id)} />
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() =>
                handleUpdateQuantity(
                  product.productId._id,
                  product.quantity - 1
                )
              }
              className="border-0 update px-2 py-1"
              type="button"
              disabled={isLoading || product.quantity === 1}
            >
              -
            </button>

            <span>{product.quantity}</span>
            <button
              onClick={() =>
                handleUpdateQuantity(
                  product.productId._id,
                  product.quantity + 1
                )
              }
              className="border-0 update "
              type="button"
              disabled={isLoading}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
