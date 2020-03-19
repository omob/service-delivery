import Joi from 'joi-browser';
import React from 'react';
import Form from '../../common/form/form';
import authService from '../../services/authService';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './loginForm.scss';

class LoginForm extends Form {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = {
		email: Joi.string().required().email().label('Email'),
		password: Joi.string().required().label('Password')
	};

	doSubmit = async () => {
		// call the server
		try {
			const { email, password } = this.state.data;
			// await authService.login(email, password);

			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.login = ex.response.data;

				this.setState({ errors });
			}
		}
	};

	handleOnchange = (e) => {
		const errors = { ...this.state.errors };
		if (errors.login) {
			delete errors.login;
			this.setState({ errors });
		}
	};

	render() {
		if (authService.getCurrentUser()) return <Redirect to="/" />;

		const { errors } = this.state;
		return (
			<div className="col-box">
				<span className="login-banner" />
				<h2 className="pb-3 header-sdm">Login</h2>
				{errors.login && <div className="alert alert-danger">{errors.login}</div>}
				<form onSubmit={this.handleSubmit} onChange={this.handleOnchange}>
					{this.renderInput('email', 'Email', 'email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Sign In')}
				</form>

				<div className="text-muted text-center">
					<Link to="/register">Or Register</Link>
				</div>
			</div>
		);
	}
}

export default LoginForm;
