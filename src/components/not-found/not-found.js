import React from 'react';
import './not-found.scss';
import notFounds from './notFounds.png';

function NotFound(props) {
	return (
		<div className="col-box">
			<div className="u-center">
				<img className="fourOhFour" src={notFounds} alt="not found" />
				<h2>Not Found</h2>
			</div>
		</div>
	);
}

export default NotFound;
