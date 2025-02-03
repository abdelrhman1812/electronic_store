const OrderAddress = ({ order }) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="order-address mt-4  ">
          <h3>Order Address</h3>

          <h4>
            City :<span className="fs-5"> {order?.shoppingAddress?.city}</span>
          </h4>
          <h4>
            Street :
            <span className="fs-5"> {order?.shoppingAddress?.street}</span>
          </h4>
          <h4>
            Phone :
            <span className="fs-5 "> {order?.shoppingAddress?.phone}</span>
          </h4>
          <hr />

          <h4>
            Date :
            <span className="fs-5">
              <small>{order?.createdAt?.slice(0, 10)}</small>
            </span>
          </h4>
        </div>
      </div>
    </>
  );
};

export default OrderAddress;
