import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className="btn btn-outline-light btn-lg px-5"
    type="submit"
    {...props}
  >
    {children}
  </button>
);
