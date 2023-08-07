import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";
import {  useHistory } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Auth } from "aws-amplify";
//import {stripePromise} from "../core/stripe"
import { monthlyDeal, arrangementDeals } from "../core/products";




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.flowerarchitect.club">
        www.flowerarchitect.club
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const Memebership = () => {
  const history = useHistory();



  async function createGroup() {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user.signInUserSession.idToken.jwtToken);
    
    const response = await  axios.get("https://cors-anywhere.herokuapp.com/https://myflowerarchitect.com/arranger/account/membership", {
   headers: {
     'Authorization': `Bearer ${user.signInUserSession.idToken.jwtToken}`,
     "Accept": "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*'
   }
 });
  console.log(response);

  }
  useEffect(() => {
      createGroup();
     
  }, [])
  return (
    <React.Fragment>
      <NavBar backgroundColor="bg-gray-100" />
      <div className="container mx-auto my-2">

    <div className="lg:text-center my-10">
      <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Flower Architect.</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Design you own Flower Arrangements
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
       Buy a membership now or sign-up for a limited free trial. Try the FLOWERPUZZLES game created with FlowerArchitect.
      </p>
    </div>
      
<div className="flex flex-wrap items-start justify-center py-4 pt-0">

      </div>
        {/* Footer */}
      <Footer>
<Copyright />
      </Footer>
      </div>
      {/* End footer */}
    </React.Fragment>
  );
};
export default Memebership;