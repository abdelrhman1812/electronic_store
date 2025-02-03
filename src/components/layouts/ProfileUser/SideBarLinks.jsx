import { BiCart, BiLogOutCircle, BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import useHandleLogout from "../../../lib/HandleLogout";

const SidebarLinkItem = ({ to, icon: Icon, label, isLogout, onClick }) => (
  <li className="mb-3 d-flex align-items-center">
    {!isLogout ? (
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active-link-profile" : "")}
      >
        <Icon size={20} className="me-2" />
        {label}
      </NavLink>
    ) : (
      <button
        className="border-0 bg-transparent d-flex align-items-center"
        onClick={onClick}
      >
        <Icon size={20} className="me-2" />
        {label}
      </button>
    )}
  </li>
);

const SideBarLinks = () => {
  const { handleLogout } = useHandleLogout();

  return (
    <>
      <SidebarLinkItem
        to="/profile/order"
        icon={BiCart}
        label="Orders"
        isLogout={false}
      />
      <SidebarLinkItem
        to="/profile/account"
        icon={BiUser}
        label="Account"
        isLogout={false}
      />
      <SidebarLinkItem
        icon={BiLogOutCircle}
        label="Logout"
        isLogout={true}
        onClick={handleLogout}
      />
    </>
  );
};

export default SideBarLinks;
