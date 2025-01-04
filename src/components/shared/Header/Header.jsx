import { useEffect, useState } from "react";
import "../../../assets/style/header.css";
import MainHeader from "./MainHeader";
import TopNav from "./TopNav";
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const toggle = () => {
    setShowNav(!showNav);
  };

  function handelFixedHeader() {
    let scroll = window.scrollY;
    const fixedTop =
      scroll < 150 ? setFixedHeader(true) : setFixedHeader(false);
    return fixedTop;
  }

  useEffect(() => {
    const handleScroll = () => {
      handelFixedHeader();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={` ${!fixedHeader ? " " : ""}`}>
      <TopNav />
      <MainHeader showNav={showNav} setShowNav={setShowNav} toggle={toggle} />
      {/* <NavBar showNav={showNav} toggle={toggle} /> */}
    </header>
  );
};

export default Header;
