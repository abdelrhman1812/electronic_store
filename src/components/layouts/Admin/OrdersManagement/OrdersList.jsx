import { useCallback, useEffect, useState } from "react";
import { getUserOrders } from "../../../../services/Apis/checkout/checkout";
import IsLoading from "../../../shared/IsLoading/IsLoading";

const OrdersList = () => {
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="container-xl order-list">
      {loading ? (
        <IsLoading width={100} height={100} />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orders.length === 0 ? (
        <div className="alert alert-warning  ">No orders found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Products</th>
                <th>Order Date</th>
                <th>Payment</th>
                <th>Price</th>
                <th>Status</th>
                <th>Address</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="order-item-info">
                    {order.orderItems.map((item, i) => (
                      <div key={i} className="d-flex gap-2 align-items-center">
                        <img
                          src={item?.productId?.imageCover?.secure_url}
                          alt={item?.productId?.title || "Product"}
                          width={50}
                          height={50}
                        />
                        <h5>{item?.productId?.title || "Unnamed Product"}</h5>
                      </div>
                    ))}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.totalOrderPrice} EGP</td>
                  <td>
                    <span>Paid</span>
                    <br />
                    <span>
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </span>
                  </td>
                  <td>
                    {order.shoppingAddress?.city || "Unknown City"}
                    <br />
                    {order.shoppingAddress?.phone || "Unknown Phone"}
                  </td>
                  <td>{order.user || "Unknown User"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
