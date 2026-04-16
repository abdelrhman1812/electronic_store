import { useEffect, useState } from "react";
import {
  BiChevronDown,
  BiChevronRight,
  BiCategory,
  BiBox,
  BiPalette,
  BiCartAlt,
  BiGridAlt,
  BiLogOut,
  BiStore,
} from "react-icons/bi";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/Images/logo.png";
import { useTheme } from "../../../context/ThemeProvider";

const SidebarSection = ({
  title,
  icon,
  links,
  section,
  openSection,
  toggleSection,
}) => {
  const isOpen = openSection === section;

  return (
    <div className="section-toggle">
      <button
        className={`w-100 d-flex justify-content-between align-items-center ${isOpen ? "active-parent" : ""}`}
        onClick={() => toggleSection(section)}
      >
        <span className="d-flex align-items-center gap-2">
          {icon} <span className="label-text">{title}</span>
        </span>
        <span className="toggle-icon">
          {isOpen ? <BiChevronDown size={16} /> : <BiChevronRight size={16} />}
        </span>
      </button>
      <ul className={`submenu ${isOpen ? "open" : ""}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              end
              to={to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminSidebar = ({ menuActive, setMenuActive }) => {
  const [openSection, setOpenSection] = useState(null);
  let location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const currentSection = location.pathname.split("/")[2];
    if (currentSection) {
      setOpenSection(currentSection.toLowerCase());
    }
  }, [location]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) {
        setMenuActive(false);
      } else {
        setMenuActive(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMenuActive]);

  return (
    <aside
      className={`admin-sidebar ${menuActive ? "show" : ""}`}
      style={{
        display: menuActive ? "block" : "none",
      }}
    >
      <div className="sidebar-header py-4 px-4 d-flex justify-content-center">
        <Link to="/">
          <img
            style={!isDark ? { filter: "invert(1)" } : {}}
            src={Logo}
            className="logo-img"
            alt="Electro"
            height="32"
          />
        </Link>
      </div>

      <nav className="sidebar-nav flex-grow-1 overflow-y-auto">
        <div className="sidebar-label">Main</div>
        <ul>
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `dashboard-link w-100 d-flex align-items-center gap-2 ${isActive ? "active" : ""}`
              }
            >
              <BiGridAlt className="icon-link-sidebar" />
              <span className="label-text">Dashboard</span>
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-label">Management</div>
        <ul>
          <SidebarSection
            title="Products"
            icon={<BiBox className="icon-link-sidebar" />}
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
            icon={<BiCategory className="icon-link-sidebar" />}
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
            icon={<BiPalette className="icon-link-sidebar" />}
            section="brands"
            openSection={openSection}
            toggleSection={toggleSection}
            links={[
              { to: "brands", label: "Brand List" },
              { to: "brands/add", label: "Add Brand" },
            ]}
          />

          <SidebarSection
            title="Orders"
            icon={<BiCartAlt className="icon-link-sidebar" />}
            section="orders"
            openSection={openSection}
            toggleSection={toggleSection}
            links={[
              { to: "Orders", label: "Order List" },
              { to: "Orders/add", label: "Add Order" },
            ]}
          />
        </ul>
      </nav>

      <div className="sidebar-footer border-top p-3 mt-auto">
        <ul className="mb-0">
          <li>
            <Link to="/" className="w-100 d-flex align-items-center gap-2 footer-link p-2 rounded-2">
              <BiStore className="icon-link-sidebar" />
              <span>Visit Store</span>
            </Link>
          </li>
          <li className="mt-1">
             <button className="w-100 d-flex align-items-center gap-2 footer-link p-2 rounded-2 border-0 bg-transparent text-danger">
              <BiLogOut className="icon-link-sidebar text-danger" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
