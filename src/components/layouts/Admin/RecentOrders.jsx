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
    <div className="recentOrders d-grid">
      <div className="cardHeader d-flex justify-content-between align-items-center mb-3">
        <h2>Recent Orders</h2>
        <Link to="/admin/ordersList" className="btn">
          View All
        </Link>
      </div>

      {loading ? (
        <IsLoading height={100} width={100} count={4} />
      ) : error ? (
        <ErrorMsg error={error} />
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <span className="text-muted">No recent orders found</span>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Payment</td>
                <td className="text-end">Status</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td className="fw-medium">{item?.productId?.title || "Unnamed Product"}</td>
                    <td className="text-muted">
                      {item?.price ? `$${item.price}` : "Price Unavailable"}
                    </td>
                    <td>{order.paymentStatus || "N/A"}</td>
                    <td className="text-end">
                      <span
                        className={`status ${
                          order.isDelivered ? "delivered" : "pending"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
