import { Link } from "react-router-dom";
import "./../../../assets/style/dashboard.css";
import "./../../../assets/style/order.css";
const Sidebar = () => {
  return (
    <section className="sideBar py-2">
      <ul className="list-group">
        <li className="list-group-item">
          <h4>Dashboard</h4>
        </li>
        <Link to={"/profile/order"}>
          <li className="list-group-item py-3">Orders</li>
        </Link>
        <Link to={"/profile/address"}>
          <li className="list-group-item py-3">Address</li>
        </Link>
        <Link to={"/profile/account"}>
          <li className="list-group-item py-3">Account</li>
        </Link>

        <li className="list-group-item py-3">Logout</li>
      </ul>
    </section>
  );
};

export default Sidebar;
