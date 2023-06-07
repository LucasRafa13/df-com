import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
    <div className="card-body p-5 text-center">{children}</div>
  </div>
);
