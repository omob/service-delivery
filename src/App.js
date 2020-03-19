import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import ProtectedRoute from "./common/protectedRoute/ProtectedRoute";
import Dashboard from "./components/dashboard/dashboard";
import Reports from "./components/dashboard/reports/reports";
import ReviewForm from "./components/dashboard/review-form/review-form";
import StaffProfileForm from "./components/dashboard/staff-profile/staff-profile-form";
import Staffs from "./components/dashboard/staffs/staffs";
import LandingPage from "./components/landing-page/landing-page";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout/logout";
import Navbar from "./components/navbar/navbar";
import NotFound from "./components/not-found/not-found";
import RegisterForm from "./components/register/registerForm";
import authService from "./services/authService";
import StaffProfile from "./components/dashboard/staff-profile/staff-profile";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authService.getCurrentUser() || null);
  }, []);

  return (
    <Fragment>
      <Navbar user={user} />
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
        <ProtectedRoute
          path="/staffs/new"
          component={StaffProfileForm}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/staffs/:id"
          component={StaffProfile}
        ></ProtectedRoute>
        <ProtectedRoute path="/staffs" component={Staffs}></ProtectedRoute>

        <ProtectedRoute path="/reports" component={Reports}></ProtectedRoute>
        <Route path="/home" component={LandingPage}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
        <Redirect to="/not-found"></Redirect>
      </Switch>
    </Fragment>
  );
};

export default App;
