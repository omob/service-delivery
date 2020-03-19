import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
export default function Dashboard() {
  return (
    <div className="col-box">
      <div className="row">
        <div className="col-12">
          <h2 className="header-sdm">Dashboard</h2>
        </div>
        <div className="col">
          <span className="col-img1" />
          <Link className="col-btn" to="/review-form">
            Create Staff Review Form
          </Link>
        </div>
        <div className="col">
          <span className="col-img2" />
          <Link className="col-btn" to="">
            Create Form
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span className="col-img3" />
          <Link className="col-btn" to="/reports">
            View Report
          </Link>
        </div>
        <div className="col">
          <span className="col-img4" />
          <Link className="col-btn" to="/staffs">
            View Staffs
          </Link>
        </div>
      </div>
    </div>
  );
}
