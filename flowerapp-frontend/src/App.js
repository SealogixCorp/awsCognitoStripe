import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Home from "./components/Home";
//import Home1 from "./components/Home1";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import Welcome from "./components/auth/Welcome";
import RequireAuth from "./components/auth/Require-auth";
import ResetPassword from "./components/auth/Reset-password";
import MyAccount from "./components/My-Account";
import MyGroups from "./components/My-groups";
import EditGroup from "./components/groups/Edit";
import CreateGroup from "./components/groups/Create";
import Group from "./components/groups/Group";
import CheckoutForm from "./components/Checkout";
import Membership from "./components/My-Membership";
import "./App.css";


 const stripePromise = loadStripe('pk_test_P9SL6JXjtpSUTyNCUFTmWSpD');

const App = () => {
  useEffect(() => {
    const timer = setInterval(async () => {
      const user = await Auth.currentAuthenticatedUser();
      const credentials = await Auth.currentCredentials();
      localStorage.setItem(
        "JWT_TOKEN_KEY",
        `${user.keyPrefix}.${user.username}.idToken`
      );
      localStorage.setItem('identity_id',JSON.stringify(credentials));
    }, 3300000);
    return () => clearInterval(timer);
  }, []);
  return (
    <React.Fragment>
<Elements stripe={stripePromise}>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/group/create" exact component={CreateGroup} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="/" exact={true} component={RequireAuth(Home)} />
          <Route path="/account/profile" exact component={RequireAuth(MyAccount)} />
          <Route path="/my-groups" exact component={RequireAuth(MyGroups)} />
          <Route path="/account/membership" exact component={RequireAuth(Membership)} />
          
          <Route path="/group/:id" exact component={RequireAuth(Group)} />
          <Route path="/checkout/:id" exact component={RequireAuth(CheckoutForm)} />
          <Route
            path="/group/edit/:id"
            exact
            component={RequireAuth(EditGroup)}
          />

          <Route component={() => <h1>404</h1>} />
        </Switch>
      </BrowserRouter>
      </Elements>
    </React.Fragment>
  );
};

export default App;
