import Joi from "joi-browser";
import React, { Fragment } from "react";
import Form from "../../../common/form/form";
import ImagePreview from "../../../common/image-preview/image-preview";
import RatingStar from "../../../common/rating-star/rating-star";

import staffService from "../../../services/staffService";
import "./ReviewForm.scss";
import Error from "../../../common/error";
import { Link } from "react-router-dom";

class ReviewForm extends Form {
  state = {
    data: { staffId: "", client: "" },
    staffs: [],
    errors: {},
    customFields: {},
    customFieldForm: {
      fieldName: "",
    },
    isToggled: false,
    submittedForm: null,
  };

  schema = {
    staffId: Joi.string().required().label("Staff"),
    client: Joi.string().required().label("Client"),
  };

  async componentDidMount() {
    const { location } = this.props;

    if (location.state) {
      const state = { ...location.state, editMode: true };
      return this.setState(state);
    }

    this.populateStaffs();
  }

  populateStaffs = async () => {
    const { data } = await staffService.getStaffs();
    this.setState({
      staffs: [{ _id: "", name: "" }, ...this.mapStaffsToSelectInput(data)],
    });
  };

  mapStaffsToSelectInput = (staffs) => {
    return staffs.map(({ _id, name, imageUrl }) => {
      return {
        _id,
        name: name.firstName + " " + name.lastName,
        imageUrl,
      };
    });
  };

  handleAddCustomField = (e) => {
    e.preventDefault();

    const { isToggled, customFieldForm, customFields } = this.state;
    const fieldName = customFieldForm.fieldName.toLowerCase();

    if (!fieldName) return;

    customFields[fieldName] = "";
    customFieldForm.fieldName = "";

    this.setState({
      customFields: { ...customFields },
      isToggled: !isToggled,
      customFieldForm,
    });
  };

  handleCustomFieldChange = ({ currentTarget: input }) => {
    const customFieldForm = { ...this.state.customFieldForm };
    customFieldForm.fieldName = input.value;

    this.setState({ customFieldForm });
  };

  toggleCustomField = () => {
    const isToggled = this.state.isToggled;
    this.setState({
      isToggled: !isToggled,
    });
  };

  // Displays after user submits the form
  formSubmitted = () => {
    const { submittedForm } = this.state;
    const { isSubmitted, editMode, ...passState } = this.state;
    return (
      <div className="col-box">
        <p>
          Success creating review form, Click here to preview.
          <Link
            to={{
              pathname: `/review-form/preview/${submittedForm._id}`,
              state: passState,
              search: `reviewId=${submittedForm.report._id}`,
            }}
          >
            Click here
          </Link>
        </p>
      </div>
    );
  };

  doSubmit = async () => {
    // call the server

    try {
      const { customFields, data } = this.state;
      const { data: result } = await staffService.addStaffReview({
        ...data,
        ratings: { ...customFields },
      });

      this.setState({ isSubmitted: true, submittedForm: result });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.error = ex.response.data;

        this.setState({ errors, isSubmitted: false });
      }
    }
  };

  deleteRating = (field) => {
    const customFields = { ...this.state.customFields };
    delete customFields[field];

    this.setState({ customFields });
  };

  render() {
    const {
      data,
      staffs,
      isToggled,
      customFieldForm,
      customFields,
      errors,
      isSubmitted,
      editMode,
    } = this.state;

    const toggleClass = isToggled ? "fa fa-caret-up" : "fa fa-caret-down";
    const customFieldsArray = Object.keys(customFields);

    return (
      <Fragment>
        {/* View to display when user submits  */}
        {isSubmitted && this.formSubmitted()}

        {!isSubmitted && (
          <div className="col-box">
            <div className="row">
              {errors && errors.error && <Error message={errors.error} />}

              <div className="col-12 text-center">
                <h2>Create Staff Review</h2>
              </div>
              <ImagePreview />
            </div>

            <div className="row">
              <div className="col-12 text-right">
                <button
                  className="btn btn-primary"
                  onClick={this.toggleCustomField}
                >
                  <i className={toggleClass}></i>
                  &nbsp; Add Field
                </button>

                {isToggled && (
                  <div className="col-12 mt-2">
                    <form onSubmit={this.handleAddCustomField}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Form field"
                        required
                        value={customFieldForm.fieldName}
                        onChange={this.handleCustomFieldChange}
                      />
                      <button className="btn btn-primary mt-2 col-3">
                        Add
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <div className="col">
                <form onSubmit={this.handleSubmit}>
                  {this.renderSelect(
                    "staffId",
                    "Staff",
                    staffs,
                    data.staffId,
                    editMode
                  )}
                  {this.renderInput("client", "Client")}

                  {customFieldsArray.length > 0 && (
                    <div className="RatingsDiv">
                      <h4>Ratings</h4>
                      <p>What to rate</p>
                      {customFieldsArray.map((field) => (
                        <div key={field}>
                          {field} &nbsp;
                          <RatingStar
                            className="ml-2"
                            size={5}
                            isClickable={false}
                          />
                          <i
                            className="p-1 pl-2 fa fa-trash"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => this.deleteRating(field)}
                          ></i>
                        </div>
                      ))}
                    </div>
                  )}
                  {this.renderButton("Create")}
                </form>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ReviewForm;
