import React from "react";
import logo1 from "../assets/Logo.png";

const Header: React.FC = () => {
  return (
    <div className="logo-container">
      <img src={logo1} alt="Logo 1" className="logo-image" />
    </div>
  );
};

export default Header;
