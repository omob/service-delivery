import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import './landing-page.scss';
// import 'sdm-landing.svg';

function LandingPage(props) {
	if (authService.getCurrentUser()) return <Redirect to="/dashboard" />;
	return (
		<div className="container">
			<div className="row align-items-center extra">
				<div className="col mt-5">
					<h2 className="sdm-title">
						SERVICE <br />DELIVERY<br /> MONITORS
					</h2>
					<Link className="btn btn-home" to="/login">
						Sign In
					</Link>
					<Link className="btn btn-home" to="/register">
						Register
					</Link>
				</div>
				<div className="col">
					<div className="bg-image" />
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
