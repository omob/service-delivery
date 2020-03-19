import React, { Component } from "react";
import { Link } from "react-router-dom";
import staffService from "../../../services/staffService";
import RatingStar from "../../../common/rating-star/rating-star";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = { staffs: [] };
  }

  async componentDidMount() {
    const { data } = await staffService.getStaffs();
    this.setState({ staffs: data });
  }

  render() {
    const tableColumn = ["Staff", "Role", "Ratings", ""];
    const { staffs } = this.state;
    return (
      <div>
        <h1>Staffs</h1>

        <table className="table">
          <thead>
            <tr>
              {tableColumn.map((column, index) => (
                <th scope="col" key={index}>
                  {column.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staffs.map(staff => (
              <tr key={staff._id}>
                <th scope="row">
                  {staff.name.firstName} {staff.name.lastName}
                </th>
                <td>{staff.role}</td>
                <td>
                  <RatingStar rating={staff.ratings} />
                </td>
                <td>
                  <Link className="btn btn-primary" to={"/staffs/" + staff._id}>
                    {" "}
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Staffs;
