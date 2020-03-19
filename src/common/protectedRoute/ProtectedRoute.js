import React from 'react';
import { Route, Redirect } from 'react-router';
// import authService from '../../services/authService';

export default function ProtectedRoute({ path, component: Component, render, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				// if (!authService.getCurrentUser()) {
				//   return (
				//     <Redirect
				//       to={{ pathname: "/login", state: { from: props.location } }}
				//     ></Redirect>
				//   );
				// }
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
}
