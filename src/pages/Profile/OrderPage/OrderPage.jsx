import { useEffect, useState } from "react";
import Empty from "../../../components/shared/Empty/Empty";
import ErrorMsg from "../../../components/shared/ErrorMsg/ErrorMsg";
import IsLoading from "../../../components/shared/IsLoading/IsLoading";
import { getUserOrders } from "../../../services/Apis/checkout/checkout";
import "./../../../assets/style/order.css";
import OrderAddress from "./OrderAddress";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

const OrderPage = () => {
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
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  // const removeOrder = async (id) => {
  //   try {
  //     await deleteOrder(id);
  //     notify("success", "Order deleted");
  //     getOrders(); // Refresh orders after deletion
  //   } catch (error) {
  //     notify("error", "Failed to delete the order. Please try again.");
  //     console.error("Error deleting order:", error);
  //   }
  // };

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
                {/* <CiTrash
                  onClick={() => removeOrder(order._id)}
                  className="delete-icon"
                /> */}

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

export default OrderPage;
