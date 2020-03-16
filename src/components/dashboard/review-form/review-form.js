import React from "react";
import Form from "../../../common/form/form";
import Joi from "joi-browser";

class ReviewForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    staffId: Joi.string()
      .required()
      .label("Staff Id"),
    role: Joi.string()
      .required()
      .label("Role")
  };

  doSubmit = async () => {
    // call the server
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h2>Create Staff Review</h2>
          </div>
          <div className="col text-right">
            <button className="btn btn-primary">Add Field</button>
          </div>
          <div id="addFormField">
            <input type="text" placeholder="Question" />
            <input type="text" placeholder="Input Type" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect("staffId", "Staff Id", [])}
              {this.renderInput("role", "Role")}

              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewForm;
