import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../input/input";
import Select from "../select/select";
import TextArea from "../text-area/text-area";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton = (label = "Submit") => {
    return (
      <button disabled={this.validate()} className="btn" type="submit">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
        className="form-input"
      ></Input>
    );
  };

  renderSelect = (name, label, data, value = "", disabled = false) => {
    const { errors } = this.state;
    return (
      <Select
        items={data}
        name={name}
        label={label}
        value={value}
        error={errors[name]}
        onChange={this.handleChange}
        disabled={disabled}
      ></Select>
    );
  };

  renderTextArea = (name, label, showLabel = true) => {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        showLabel={showLabel}
        onChange={this.handleTextAreaChange}
      />
    );
  };

  handleTextAreaChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };
}

export default Form;
