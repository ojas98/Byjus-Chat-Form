import React from "react";
import logo from "../../assets/Logo.png";

interface CardHeaderProps {
  children?: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return (
    <div className="border-b flex flex-col items-center p-6 gap-6">
      <img src={logo} alt="Logo" className="flex-1 w-full max-w-md mx-auto" />
      {children}
    </div>
  );
};

export default CardHeader;
