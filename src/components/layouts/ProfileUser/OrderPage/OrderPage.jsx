import { useEffect, useState } from "react";
import "../../../../assets/style/order.css";
import { getUserOrders } from "../../../../services/Apis/checkout/checkout";
import Empty from "../../../shared/Empty/Empty";
import ErrorMsg from "../../../shared/ErrorMsg/ErrorMsg";
import IsLoading from "../../../shared/IsLoading/IsLoading";
import OrderAddress from "./OrderAddress";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

const OrderPageUser = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  const getOrders = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const data = await getUserOrders();
      setOrders(data?.orders || []);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="order-page">
      {loading ? (
        <div className="row m-0 g-3">
          <IsLoading count={4} columns={1} height={100} />
        </div>
      ) : error ? (
        <div className="error-message text-center">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <>
          {orders?.length === 0 ? (
            <Empty title="You have no orders" description="Start shopping" />
          ) : (
            orders.map((order, index) => (
              <div key={order._id} className="order position-relative p-2 mb-5">
                <small className="d-block text-center">Order {index + 1}</small>

                <div className="row">
                  {order?.orderItems.map((item) => (
                    <div className="col-lg-6" key={item._id}>
                      <OrderItem orderItem={item} />
                    </div>
                  ))}
                </div>

                <div className="row details">
                  <OrderSummary order={order} />
                  <OrderAddress order={order} />
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OrderPageUser;
