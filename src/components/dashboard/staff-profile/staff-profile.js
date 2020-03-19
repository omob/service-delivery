import React, { Fragment, useEffect, useState } from "react";
import ImagePreview from "../../../common/image-preview/image-preview";
import staffService from "../../../services/staffService";

const StaffProfile = ({ match }) => {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    (async () => {
      const staffId = match.params.id;
      const { data } = await staffService.getStaff(staffId);
      setStaff(data);
    })();
    return () => {};
  }, [match.params.id]);

  const getFullName = () => {
    const { name } = staff;
    return name.firstName + " " + name.lastName;
  };

  return (
    <Fragment>
      <h2>Staff Profile</h2>
      {staff && (
        <Fragment>
          <div className="col-12 text-center">
            <div className="header">
              <ImagePreview />
              <h3> {getFullName()}</h3>
              <span> {staff.role}</span>
            </div>
            <div className="col-8">
              <div className="col-3">Outings- {staff.outings}</div>
              <div className="col-3">Reviews - {staff.reviews}</div>
              <div className="col-3">Avg. Ratings - {staff.averageRating}</div>
            </div>
          </div>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  {["Company", "Rating", "Review", "Date"].map(
                    (column, index) => (
                      <th scope="col" key={index}>
                        {column.toUpperCase()}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              {/* <tbody>
            {staffs.map(staff => (
              <tr key={staff._id}>
                <th scope="row">
                  {staff.name.firstName} {staff.name.lastName}
                </th>
                <td>{staff.role}</td>
                <td>{staff.ratings}</td>
                <td>
                  <Link className="btn btn-primary" to={"/staffs/" + staff._id}>
                    {" "}
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody> */}
            </table>
          </div>
        </Fragment>
      )}

      {!staff && <p>Could not load staff info</p>}
    </Fragment>
  );
};

export default StaffProfile;
