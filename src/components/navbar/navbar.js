import React from "react";
import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";

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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  );
};

export default Navbar;
