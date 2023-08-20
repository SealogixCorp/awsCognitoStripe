import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Delete from "./components/Delete";
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
 
        <Routes>
        <Route path="/" exact={true} element={RequireAuth(Home )} />
          <Route path="/signup" exact element={<Signup/>} />
          <Route path="/signin" exact element={<SignIn/>} />
          <Route path="/welcome" exact element={<Welcome/>} />
          <Route path="/welcome" exact element={<Welcome/>} />
          <Route path="/group/create" exact element={<CreateGroup/>} />
          <Route path="/reset-password" exact element={<ResetPassword/>} />
          
          <Route path="/account/profile" exact element={RequireAuth(MyAccount)} />
           <Route path="/account/delete" exact element={RequireAuth(Delete)} />
          <Route path="/my-groups" exact element={RequireAuth(MyGroups)} />
          <Route path="/account/membership" exact element={RequireAuth(Membership)} />
          <Route path="/group/:id" exact element={RequireAuth(Group)} />
          <Route path="/checkout/:id" exact element={RequireAuth(CheckoutForm)} />
          <Route
            path="/group/edit/:id"
            exact
            element={RequireAuth(EditGroup)}
          />

          {/* <Route element={() => (<h1>404</h1>)} /> */}
        </Routes>
 
      </Elements>
    </React.Fragment>
  );
};

export default App;
