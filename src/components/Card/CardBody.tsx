import React from "react";

interface CardBodyProps {
  children?: React.ReactNode;
}
const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return <div className="flex-grow overflow-scroll flex">{children}</div>;
};

export default CardBody;
