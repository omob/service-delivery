import React, { Fragment } from "react";
import queryString from "query-string";
import Form from "../../common/form/form";
import ImagePreview from "../../common/image-preview/image-preview";
import RatingStar from "../../common/rating-star/rating-star";
import reviewService from "../../services/reviewService";

class ClientStaffView extends Form {
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
      if (error.response && error.response.status) {
        console.log(error);
      }

      const errors = { ...this.state.errors };
      errors.error = "Something happened, try again later.";
      this.setState({ errors });
    }
  };

  handleRatingsChange = (selectedRate, index) => {
    const reports = { ...this.state.reports };
    const { report } = reports;
    const ratingsToArray = Object.keys(report.ratings.rating);

    report.ratings.rating[ratingsToArray[index]] = selectedRate;

    reports.report = report;

    this.setState({ reports });
  };

  doSubmit = async () => {
    const { match, location, history } = this.props;
    const { reviewId } = queryString.parse(location.search);

    const { data, ratings } = { ...this.state };
    ratings.review = data.review;

    await reviewService.updateReview({
      reportId: match.params.id,
      reviewId,
      ratings,
    });

    history.push("/form-submitted");
  };

  render() {
    const { staff, ratings, errors } = this.state;
    const { error } = errors;
    return (
      <Fragment>
        {error && <p>{error}</p>}
        {!error && (
          <div className="text-center">
            <h2>Staff Rating</h2>
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
                      isClickable={true}
                      onChange={(e) => this.handleRatingsChange(e, index)}
                    />
                  </p>
                ))}
              {ratings && this.renderTextArea("review", "Review", false)}
              <hr></hr>

              <div className="form-group">
                <button className="btn btn-primary" onClick={this.doSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ClientStaffView;
