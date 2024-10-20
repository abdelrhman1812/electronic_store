import { useEffect, useState } from "react";
import "./../../../assets/style/order.css";

import { CiTrash } from "react-icons/ci";
import Empty from "../../../components/shared/Empty/Empty";
import notify from "../../../lib/notify";
import {
  deleteOrder,
  getUserOrders,
} from "../../../services/Apis/checkout/checkout";
import OrderAddress from "./OrderAddress";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const data = await getUserOrders();
    setOrders(data?.orders || []);
  };

  const removeOrder = async (id) => {
    await deleteOrder(id);
    notify("success", "Order deleted");
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className=" order-page ">
      {orders?.length === 0 && (
        <Empty title="You have no orders" description="Start shopping" />
      )}
      {orders?.map((order, index) => (
        <div key={order._id} className="order mb-5">
          <small className="d-block text-muted text-center">
            Order {index + 1}
          </small>
          <CiTrash onClick={() => removeOrder(order._id)} />
          {order?.orderItems.map((item) => (
            <OrderItem key={item._id} orderItem={item} />
          ))}
          <div className=" row details">
            <OrderSummary order={order} />
            <OrderAddress order={order} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
