import "./../../../assets/style/order.css";

const OrderItem = ({ orderItem }) => {
  return (
    <>
      <div className="order-item">
        <figure>
          <img
            src={orderItem?.productId?.imageCover.secure_url}
            alt={orderItem?.productId?.title}
            className="w-100"
          />
        </figure>
        <div className="order-info">
          <h5>{orderItem?.productId?.title}</h5>
          <h6 className="fw-bold">${orderItem?.price} </h6>
          <span>{orderItem.quantity} Piece</span>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
