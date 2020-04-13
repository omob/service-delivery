import React from 'react';
import './select.scss';
const Select = ({ name, label, items, value, error, ...rest }) => {
	return (
		<div className="form-group">
			{/* <label htmlFor={name}>{label}</label> */}
			<select className="form-control" id={name} name={name} {...rest} value={value} placeholder={name}>
				{items.map((item) => (
					<option key={item._id} value={item._id}>
						{item.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
