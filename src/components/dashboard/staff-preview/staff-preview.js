import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import Form from "../../../common/form/form";
import ImagePreview from "../../../common/image-preview/image-preview";
import RatingStar from "../../../common/rating-star/rating-star";
import reviewService from "../../../services/reviewService";

class StaffPreview extends Form {
  state = {
    reports: "",
    staff: "",
    data: {
      review: ""
    },
    errors: {}
  };

  async componentDidMount() {
    const { match, location } = this.props;
    const { reviewId } = queryString.parse(location.search);

    const { data } = await reviewService.getReview(match.params.id, reviewId);

    this.setState({
      reports: data,
      staff: data.staff,
      ratings: data.report.ratings
    });
  }

  handleRatingsChange = (selectedRate, index) => {
    const reports = { ...this.state.reports };
    const { report } = reports;
    const ratingsToArray = Object.keys(report.ratings);

    report.ratings[ratingsToArray[index]] = selectedRate;

    reports.report = report;

    this.setState({ reports });
  };

  render() {
    const { staff, ratings } = this.state;

    return (
      <div className="text-center">
        <h2>Staff Preview</h2>
        <ImagePreview />
        <h3>{staff.fullname}</h3>
        <p>{staff.role}</p>

        <div className="col-5 m-auto">
          <hr></hr>
          {ratings &&
            Object.entries(ratings).map((report, index) => (
              <p key={index}>
                {report[0].toUpperCase()}:
                <RatingStar
                  size={5}
                  rating={report[1]}
                  isClickable={false}
                  onChange={e => this.handleRatingsChange(e, index)}
                />
              </p>
            ))}
          {ratings && this.renderTextArea("review", "Review", false)}
          <hr></hr>

          <div className="form-group">
            <button className="btn btn-primary">Make Changes</button>
            <Link to="/review-form/link" className="btn btn-danger ml-2">
              Generate Link
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffPreview;
