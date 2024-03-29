import React from 'react';
import './input.scss';
const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group">
			{/* <label htmlFor={name}>{label}</label> */}
			<input className="form-control form-input" {...rest} id={name} name={name} placeholder={label} />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
