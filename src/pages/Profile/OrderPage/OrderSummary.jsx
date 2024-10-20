const OrderSummary = ({ order }) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="order-summary mt-4  ">
          <h3>Order Summary</h3>

          <h4>
            Subtotal : <span className="fs-5">$ {order?.totalOrderPrice}</span>
          </h4>
          <h4>
            Discount : <span className="fs-5 text-danger">0</span>
          </h4>
          <h4>
            Payment : <span className="fs-5 ">{order?.paymentMethod}</span>
          </h4>

          <hr />
          <h4>
            Total Price :
            <span className="fs-5 "> {order?.totalOrderPrice}</span>
          </h4>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
