import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/Images/logo.png";
import { useTheme } from "../../../context/ThemeProvider";
import {
  FcCurrencyExchange,
  FcShop,
  FcOrgUnit,
  FcMms,
  FcNext,
  FcExpand,
} from "react-icons/fc";

const SidebarSection = ({
  title,
  icon,
  links,
  section,
  openSection,
  toggleSection,
}) => (
  <div className="section-toggle">
    <button
      style={
        openSection === section
          ? { backgroundColor: "rgba(0, 123, 255, 0.5)", color: "white" }
          : undefined
      }
      className="w-100 mb-2 border-0 position-relative  d-flex justify-content-between"
      onClick={() => toggleSection(section)}
    >
      <span>
        {icon} {title}
      </span>
      <span>{openSection === section ? <FcExpand /> : <FcNext />}</span>
    </button>
    <ul className={`submenu ${openSection === section ? "open" : ""}`}>
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            end
            to={to}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const AdminSidebar = () => {
  const [openSection, setOpenSection] = useState(null);
  let location = useLocation();

  const { isDark } = useTheme();

  useEffect(() => {
    setOpenSection(location.pathname.split("/")[2]);
  }, [location]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <aside className="navigation-admin">
      <figure className="py-3 ps-2 d-flex justify-content-center align-items-center">
        <Link to="/">
          <img
            style={!isDark ? { filter: "invert(1)" } : {}}
            src={Logo}
            className="w-100 d-block mx-auto"
            alt="Electro"
          />
        </Link>
      </figure>
      <ul>
        <SidebarSection
          title="Products"
          icon={<FcShop className="me-2 icon-link-sidebar" />}
          section="products"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "products", label: "Product List" },
            { to: "products/add", label: "Add Product" },
          ]}
        />
        <SidebarSection
          title="Categories"
          icon={<FcOrgUnit className="me-2 icon-link-sidebar" />}
          section="categories"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "categories", label: "Category List" },
            { to: "categories/add", label: "Add Category" },
          ]}
        />
        <SidebarSection
          title="Brands"
          icon={<FcMms className="me-2 icon-link-sidebar" />}
          section="brands"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "Brands", label: "Brand List" },
            { to: "Brands/add", label: "Add Brand" },
          ]}
        />
        <SidebarSection
          title="Orders"
          icon={<FcCurrencyExchange className="me-2 icon-link-sidebar" />}
          section="orders"
          openSection={openSection}
          toggleSection={toggleSection}
          links={[
            { to: "Orders", label: "order List" },
            { to: "Orders/add", label: "Add order" },
          ]}
        />
      </ul>
    </aside>
  );
};

export default AdminSidebar;
