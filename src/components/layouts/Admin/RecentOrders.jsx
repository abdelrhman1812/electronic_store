import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "../../../services/Apis/checkout/checkout";
import ErrorMsg from "../../shared/ErrorMsg/ErrorMsg";
import IsLoading from "../../shared/IsLoading/IsLoading";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserOrders();
      setOrders(data?.orders || []);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="recentOrders d-grid p-3">
      <div className="cardHeader d-flex justify-content-between align-items-start">
        <h2>Recent Orders</h2>
        <Link to="/admin/orders" className="btn">
          View All
        </Link>
      </div>

      {loading ? (
        <IsLoading height={100} width={100} count={4} />
      ) : error ? (
        <ErrorMsg error={error} />
      ) : orders.length === 0 ? (
        <span className=" h-25 d-block text-center ">
          No recent orders found
        </span>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Payment</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td>{item?.productId?.title || "Unnamed Product"}</td>
                  <td>
                    {item?.price ? `$${item.price}` : "Price Unavailable"}
                  </td>
                  <td>{order.paymentStatus || "Payment Info Missing"}</td>
                  <td>
                    <span
                      className={`status ${
                        order.isDelivered ? "delivered" : "pending"
                      } p-1 text-white rounded`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentOrders;
