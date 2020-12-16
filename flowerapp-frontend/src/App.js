import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
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
import Group from "./components/groups/Group";
import "./App.css";

const App = () => {
  useEffect(() => {
    const timer = setInterval(async () => {
      const user = await Auth.currentAuthenticatedUser();
      localStorage.setItem(
        "JWT_TOKEN_KEY",
        `${user.keyPrefix}.${user.username}.idToken`
      );
    }, 3300000);
    return () => clearInterval(timer);
  }, []);
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/group/create" exact component={CreateGroup} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="/" exact={true} component={RequireAuth(Home)} />
          <Route path="/my-profile" exact component={RequireAuth(MyProfile)} />
          <Route path="/my-groups" exact component={RequireAuth(MyGroups)} />
          <Route path="/group/:id" exact component={RequireAuth(Group)} />
          <Route
            path="/group/edit/:id"
            exact
            component={RequireAuth(EditGroup)}
          />

          <Route component={() => <h1>404</h1>} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
