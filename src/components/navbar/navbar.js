import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    user && (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/dashboard">Service Delivery</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    )
  );
};

export default Navbar;
