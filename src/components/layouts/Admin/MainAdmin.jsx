import RecentCustomers from "./RecentCustomers";
import RecentOrders from "./RecentOrders";
import Sales from "./Sales";

const MainAdmin = () => {
  return (
    <div className="dashboard-content p-2 p-md-3">
      <Sales />
      <section className="details-orders-customers d-grid">
        <RecentOrders />
        <RecentCustomers />
      </section>
    </div>
  );
};

export default MainAdmin;
