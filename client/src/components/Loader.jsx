import React from "react";
import './loader.css'

const ButtonWithLoading = ({ isLoading, onClick, children }) => {
  return (
    <button
      className={`button ${isLoading ? "loading" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span className="loader" /> : children}
    </button>
  );
};

export default ButtonWithLoading;
