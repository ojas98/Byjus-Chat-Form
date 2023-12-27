import React from "react";

interface CardBodyProps {
  children?: React.ReactNode;
}
const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return <div className="mt-1 flex-grow overflow-auto">{children}</div>;
};

export default CardBody;
