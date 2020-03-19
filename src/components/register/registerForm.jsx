import React from 'react';
import Joi from 'joi-browser';
import userService from '../../services/userService';
import authService from '../../services/authService';
import Form from '../../common/form/form';
import { Link } from 'react-router-dom';
import './registerForm.scss';
class RegisterForm extends Form {
	state = {
		data: {
			email: '',
			password: '',
			companyName: '',
			firstName: '',
			lastName: ''
		},
		errors: {}
	};

	schema = {
		firstName: Joi.string().required().min(3).label('First Name'),
		lastName: Joi.string().required().min(3).label('First Name'),
		password: Joi.string().required().min(5).label('Password'),
		// confirmPassword: Joi.any()
		//   .valid(Joi.ref("password"))
		//   .required(),
		companyName: Joi.string().required().label('Company Name'),
		email: Joi.string().required().email().label('Email')
	};

	doSubmit = async () => {
		// call the server
		try {
			const response = await userService.register(this.state.data);
			authService.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;

				this.setState({ errors });
			}
		}
	};
	render() {
		return (
			<div className="row">
				<div className="col-box">
          <span className="reg-img"></span>
					<h2 className="mb-4 header-sdm">Register</h2>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput('companyName', 'Company Name')}
						{this.renderInput('firstName', 'First Name')}
						{this.renderInput('lastName', 'Last Name')}
						{this.renderInput('email', 'Email', 'email')}
						{this.renderInput('password', 'Password', 'password')}
						{/* {this.renderInput(
              "confirmPassword",
              "Confirm Password",
              "password"
            )} */}
						{this.renderButton('Register')}
					</form>

					<div className="text-muted text-center">
						<Link to="/login">Or Login</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
