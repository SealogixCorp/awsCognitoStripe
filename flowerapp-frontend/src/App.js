import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import Welcome from "./components/auth/Welcome";
import RequireAuth from "./components/auth/Require-auth";
import ResetPassword from "./components/auth/Reset-password";
import MyProfile from "./components/My-profile";
import MyGroups from "./components/My-groups";
import EditGroup from "./components/groups/Edit";
import CreateGroup from "./components/groups/Create";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={SignIn} />
          <Route path="/welcome" component={Welcome} />
            <Route path="/group/create" component={CreateGroup} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/" exact={true} component={RequireAuth(Home)} />
          <Route path="/my-profile" component={RequireAuth(MyProfile)} />
          <Route path="/my-groups" component={RequireAuth(MyGroups)} />
          <Route path="/group/edit/:id" component={RequireAuth(EditGroup)} />
          <Route component={() => <h1>404</h1>} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
