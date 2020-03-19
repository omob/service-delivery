import Joi from "joi-browser";
import React from "react";
import Error from "../../../common/error";
import Form from "../../../common/form/form";
import ImagePreview from "../../../common/image-preview/image-preview";
import staffService from "../../../services/staffService";
import "./staff-profile-form.scss";

class StaffProfileForm extends Form {
  state = {
    data: { firstName: "", lastName: "", role: "" },
    imagePreview: "",
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(3)
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .min(3)
      .label("First Name"),
    role: Joi.string()
      .required()
      .min(3)
      .label("Role")
  };

  // handleFile = input => {
  //   console.log("here");
  //   input.addEventListener("change", ({ target }) => {
  //     const file = target.files[0];
  //     console.log(file);

  //     if (file) {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => {
  //         console.log(this);
  //       });
  //     }
  //   });
  // };

  doSubmit = async () => {
    // call the server
    try {
      await staffService.register(this.state.data);
      this.props.history.push("/staffs");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.data = ex.response.data;

        this.setState({ errors });
      }
    }
  };
  render() {
    const { errors, data } = this.state;
    return (
      <div className="col-12">
        <h2 className="text-center"> Create Staff Profile </h2>
        {errors.data && <Error message={errors.data} />}
        <ImagePreview imageSrc="" alt={data.firstName} />
        <form onSubmit={this.handleSubmit}>
          <div>{/* image */}</div>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("role", "Role")}
          {/* {this.renderInput("image", "Image", "file")} */}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default StaffProfileForm;
