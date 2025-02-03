import { Link } from "react-router-dom";
import "../../../../assets/style/order.css";

const OrderItem = ({ orderItem }) => {
  return (
    <>
      <div className="order-item d-flex align-items-center position-relative p-2 mb-2">
        <figure>
          <img
            src={orderItem?.productId?.imageCover.secure_url}
            alt={orderItem?.productId?.title}
            className="w-100"
          />
        </figure>
        <div className="order-info">
          <Link to={`/product/${orderItem?.productId?._id}`}>
            <h5>{orderItem?.productId?.title}</h5>
          </Link>
          <h6 className="fw-bold">${orderItem?.price} </h6>
          <span className="position-absolute bottom-0 end-0 p-1  text-center text-white">
            {orderItem.quantity} Piece
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
