import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout/logout";
import RegisterForm from "./components/register/registerForm";
import ReviewForm from "./components/dashboard/review-form/review-form";
import Navbar from "./components/navbar/navbar";
import NotFound from "./components/not-found/not-found";
import LandingPage from "./components/landing-page/landing-page";
import Dashboard from "./components/dashboard/dashboard";
import Staffs from "./components/dashboard/staffs/staffs";
import Reports from "./components/dashboard/reports/reports";
import authService from "./services/authService";
import ProtectedRoute from "./common/protectedRoute/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authService.getCurrentUser() || null);
  }, []);

  return (
    <Fragment>
      <Navbar user={user} />
      <div className="container-fluid p-4">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/review-form"
            component={ReviewForm}
          ></ProtectedRoute>
          <ProtectedRoute path="/staffs" component={Staffs}></ProtectedRoute>
          <ProtectedRoute path="/reports" component={Reports}></ProtectedRoute>
          <Route path="/home" component={LandingPage}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/home"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </div>
    </Fragment>
  );
};

export default App;
