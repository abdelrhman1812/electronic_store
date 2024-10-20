import { useState } from "react";
import "../../../assets/style/header.css";
import MainHeader from "./MainHeader";
import NavBar from "./NavBar";
import TopNav from "./TopNav";
const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const toggle = () => {
    setShowNav(!showNav);
  };

  return (
    <header>
      <TopNav />
      <MainHeader setShowNav={setShowNav} toggle={toggle} />
      <NavBar showNav={showNav} toggle={toggle} />
    </header>
  );
};

export default Header;
