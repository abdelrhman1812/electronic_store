import PageHeader from "../../../shared/PageHeader/PageHeader";
import OrdersList from "./OrdersList";

const OrdersManagement = () => {
  return (
    <section className="orders-list ">
      <PageHeader title="Orders" />
      <div className="container-xl py-5">
        <div className="row row-gap-4">
          <OrdersList />
        </div>
      </div>
    </section>
  );
};

export default OrdersManagement;
