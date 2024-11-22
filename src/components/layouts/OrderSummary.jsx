import { Link } from "react-router-dom";

const OrderSummary = ({ cart, totalPrice }) => {
  return (
    <>
      <div className="col-lg-4">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p className="fw-bold">
            Total Products:
            <span className="fw-medium"> {cart.length}</span>
          </p>
          <p className="fw-bold">
            Total Price:
            <span className="fw-medium"> ${totalPrice}</span>
          </p>
          <Link to="/checkout-cash">
            <button className="mt-3 border-0 text-white">Go to Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
