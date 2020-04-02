import React from "react";

const TextArea = ({ name, label, showLabel, error, ...rest }) => {
  return (
    <div className="form-group">
      {showLabel && <label htmlFor={name}>{label}</label>}
      <textarea
        className="form-control form-input"
        {...rest}
        id={name}
        name={name}
        placeholder={label}
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
