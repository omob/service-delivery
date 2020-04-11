import React from 'react';
import './form-submitted.scss';
import formSubmitting from './formSubmitting.png'

const FormSubmitted = () => {
	return (
		<div className="col-box">
			<div class="u-center">
        <img src={ formSubmitting } alt="formSubmitting" className="formSubmitting" />
				<h2>Form submitted</h2>
			</div>
		</div>
	);
};

export default FormSubmitted;
