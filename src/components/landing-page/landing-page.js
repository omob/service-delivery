import React from "react";
import "./landing-page.scss";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/authService";

function LandingPage(props) {
  if (authService.getCurrentUser()) return <Redirect to="/dashboard" />;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col mt-5">
          <h2>SERVICE DELIVERY MONITORS</h2>
          <Link className="btn btn-primary mr-3" to="/login">
            Sign In
          </Link>
          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
        </div>
        <div className="col bg-image bg-color-primary"></div>
      </div>
    </div>
  );
}

export default LandingPage;
