import { useState } from "react";
import { BiChevronDown, BiChevronRight, BiX } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/Images/logo.png";

const AdminSidBar = ({ menuActive, toggleMenu }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className={`navigation-admin ${menuActive ? "open" : ""}`}>
      <figure className="py-3 ps-2 d-flex justify-content-between align-items-center">
        <img src={Logo} className="w-100" alt="Electro" />
        <BiX
          size={35}
          className="text-white cursor-pointer mt-3 d-block d-md-none"
          onClick={() => menuActive && toggleMenu(toggleMenu)}
        />
      </figure>
      <ul>
        <div className="section-toggle">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? "active dashboard-link" : "dashboard-link "
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="section-toggle">
          <button
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
            onClick={() => toggleSection("products")}
          >
            Products
            <span>
              {openSection === "products" ? (
                <BiChevronDown />
              ) : (
                <BiChevronRight />
              )}
            </span>
          </button>
          <ul className={`submenu ${openSection === "products" ? "open" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Product List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Product
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="section-toggle">
          <button
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
            onClick={() => toggleSection("categories")}
          >
            Categories
            <span>
              {openSection === "categories" ? (
                <BiChevronDown />
              ) : (
                <BiChevronRight />
              )}
            </span>
          </button>
          <ul
            className={`submenu ${openSection === "categories" ? "open" : ""}`}
          >
            <li>
              <NavLink
                to="categoryList"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Category List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Category
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Brands Section */}
        <div className="section-toggle">
          <button
            onClick={() => toggleSection("brands")}
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
          >
            Brands
            <span>
              {openSection === "brands" ? (
                <BiChevronDown />
              ) : (
                <BiChevronRight />
              )}
            </span>
          </button>
          <ul className={`submenu ${openSection === "brands" ? "open" : ""}`}>
            <li>
              <NavLink
                to="brandList"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Brands List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Brand
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Order Section */}
        <div className="section-toggle">
          <button
            onClick={() => toggleSection("order")}
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
          >
            Order
            <span>
              {openSection === "order" ? <BiChevronDown /> : <BiChevronRight />}
            </span>
          </button>
          <ul className={`submenu ${openSection === "order" ? "open" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Order List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Order Details
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Section */}
        <div className="section-toggle">
          <button
            onClick={() => toggleSection("customer")}
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
          >
            Customer
            <span>
              {openSection === "customer" ? (
                <BiChevronDown />
              ) : (
                <BiChevronRight />
              )}
            </span>
          </button>
          <ul className={`submenu ${openSection === "customer" ? "open" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                All Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Customer Details
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Review Section */}
        <div className="section-toggle">
          <button
            onClick={() => toggleSection("review")}
            className=" w-100 mb-2 border-0 position-relative bg-transparent text-white  d-flex justify-content-between"
          >
            Management Reviews
            <span>
              {openSection === "review" ? (
                <BiChevronDown />
              ) : (
                <BiChevronRight />
              )}
            </span>
          </button>
          <ul className={`submenu ${openSection === "review" ? "open" : ""}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                All Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </ul>
    </aside>
  );
};

export default AdminSidBar;
