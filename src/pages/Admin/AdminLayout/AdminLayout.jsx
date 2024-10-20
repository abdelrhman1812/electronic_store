import { useState } from "react";
import "../../../assets/style/admin.css";

const AdminLayout = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <body className={isDarkMode ? "dark" : ""}>
      <nav className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="logo.png" alt="Logo" />
            </span>

            <div className="text logo-text">
              <span className="name"></span>
              <span className="profession">Web Developer</span>
            </div>
          </div>

          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search Games..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Revenue</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Analytics</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i
                  className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} icon`}
                ></i>
              </div>
              <span className="mode-text text">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="text">Dashboard Sidebar</div>
      </section>
    </body>
  );
};

export default AdminLayout;
