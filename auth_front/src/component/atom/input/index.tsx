import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  label: string;
}

export const Input: React.FC<InputProps> = ({ type, id, label, ...props }) => (
  <div className="form-outline form-white mb-4">
    <input
      type={type}
      id={id}
      className="form-control form-control-lg"
      {...props}
    />
    <label className="form-label" htmlFor={id}>
      {label}
    </label>
  </div>
);
