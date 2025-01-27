// components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};
