import RecentCustomers from "./RecentCustomers";
import RecentOrders from "./RecentOrders";
import Sales from "./Sales";

const MainAdmin = () => {
  return (
    <section className="overflow-hidden  p-3">
      <Sales />
      <section className="details-orders-customers d-grid p-3">
        <RecentOrders />
        <RecentCustomers />
      </section>
    </section>
  );
};

export default MainAdmin;
