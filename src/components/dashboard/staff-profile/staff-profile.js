import React, { Fragment, useEffect, useState } from "react";
import ImagePreview from "../../../common/image-preview/image-preview";
import staffService from "../../../services/staffService";
import RatingStar from "../../../common/rating-star/rating-star";
import './staff-profile.scss'

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

  const getReports = () => {
    const { reports } = staff;
    const [report] = reports;
    return report.reports || [];
  };

  const getAverageRating = ratings => {
    if (ratings) {
      const ratingsArray = Object.values(ratings);
      const totalRating = ratingsArray
        .map(rating => parseInt(rating) || 0)
        .reduce((a, b) => a + b);

      return totalRating / ratingsArray.length;
    }

    return 0;
  };

  return (
    <Fragment>
      <div className="col-box">
      <h2 className="u-center">Staff Profile</h2>
      {staff && (
        <Fragment>
          <div className="col-12 text-center">
            <div className="header">
              <ImagePreview />
              <h3> {getFullName()}</h3>
              <span> {staff.role}</span>
            </div>
            <hr />
            {/* <div className="col-8">
              <div className="col-3">Outings- {staff.outings}</div>
              <div className="col-3">Reviews - {staff.reviews}</div>
              <div className="col-3">Avg. Ratings - {staff.averageRating}</div>
            </div> */}
            <div className="u-center">
              <table className="sfProfileStat">
                <tr className="tspacei">
                  <th>Outings</th>
                  <th>Reviews</th>
                  <th>Avg. Ratings</th>
                </tr>
                <tr className="tspacei">
                  <td>{staff.outings}</td>
                  <td>{staff.reviews}</td>
                  <td>{staff.averageRating}</td>
                </tr>
              </table>
            </div>

            <hr />
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
              <tbody>
                {getReports().map(report => (
                  <tr key={report._id}>
                    <th scope="row">{report.client}</th>
                    <td>
                      <RatingStar
                        rating={getAverageRating(report.ratings)}
                      ></RatingStar>
                    </td>
                    <td></td>
                    <td>{new Date(report.created).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </Fragment>
      )}

      {!staff && <p>Could not load staff info</p>}
      </div>
    </Fragment>
  );
};

export default StaffProfile;
