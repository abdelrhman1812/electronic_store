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
      console.log(data);
      setOrders(data?.orders || []);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Error fetching orders:", error);
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
                  <td>{item?.productId?.title || "Star Refrigerator"}</td>
                  <td>{item?.price ? `$${item.price}` : "$1200"}</td>
                  <td>{order.paymentStatus || "Paid"}</td>
                  <td>
                    <span
                      className={`status ${
                        !order?.isDelivered ? "delivered" : "delivered"
                      } p-1 text-white rounded`}
                    >
                      {order.status || "Delivered"}
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
