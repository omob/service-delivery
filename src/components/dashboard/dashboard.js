import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Dashboard</h2>
        </div>
        <div className="col">
          <Link className="btn" to="/review-form">
            Create Staff Review Form
          </Link>
        </div>
        <div className="col">
          <Link className="btn" to="/staffs/new">
            Create Staff Profile
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn" to="/reports">
            View Report
          </Link>
        </div>
        <div className="col">
          <Link className="btn" to="/staffs">
            View Staffs
          </Link>
        </div>
      </div>
    </div>
  );
}
