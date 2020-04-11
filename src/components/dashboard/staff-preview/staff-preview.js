import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
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
      review: "",
    },
    errors: {},
  };

  async componentDidMount() {
    this.handleGetReview();
  }

  handleGetReview = async () => {
    const { match, location } = this.props;
    const { reviewId } = queryString.parse(location.search);

    try {
      const { data } = await reviewService.getReview(match.params.id, reviewId);
      this.setState({
        reports: data,
        staff: data.staff,
        ratings: data.report.ratings,
      });
    } catch (error) {
      const errors = { ...this.state.errors };
      errors.error = "Something happened, try again later.";
      this.setState({ errors });
    }
  };

  handleRatingsChange = (selectedRate, index) => {
    const reports = { ...this.state.reports };
    const { report } = reports;
    const ratingsToArray = Object.keys(report.ratings);

    report.ratings[ratingsToArray[index]] = selectedRate;

    reports.report = report;

    this.setState({ reports });
  };

  handleGenerateLink = async () => {
    const { match, location } = this.props;
    const { reviewId } = queryString.parse(location.search);

    const { data } = await reviewService.updateReviewWithLink(
      match.params.id,
      reviewId
    );
    const { link } = data;

    // console.log(link);
    this.props.history.push(`/review-form/generated-link?url=${link}`);
  };

  handleMakeChanges = () => {
    this.props.history.push({
      pathname: "/review-form",
      state: this.props.location.state,
    });
  };

  render() {
    const { staff, ratings, errors } = this.state;
    const { error } = errors;
    return (
      <Fragment>
        {error && <p>{error}</p>}
        {!error && (
          <div className="text-center">
            <h2>Staff Preview</h2>
            <ImagePreview />
            <h3>{staff.fullname}</h3>
            <p>{staff.role}</p>

            <div className="col-5 m-auto">
              <hr></hr>
              {ratings &&
                ratings.rating &&
                Object.entries(ratings.rating).map((report, index) => (
                  <p key={index}>
                    {report[0].toUpperCase()}:
                    <RatingStar
                      size={5}
                      rating={report[1]}
                      onChange={(e) => this.handleRatingsChange(e, index)}
                    />
                  </p>
                ))}
              {ratings && this.renderTextArea("review", "Review", false)}
              <hr></hr>

              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={this.handleMakeChanges}
                >
                  Make Changes
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={this.handleGenerateLink}
                >
                  Generate Link
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default StaffPreview;
