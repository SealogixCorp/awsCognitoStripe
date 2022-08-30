import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
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

export default () => {
  const history = useHistory();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState({
    name: "Flower bouquet",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS2A1ZNYahTtgaHpGKyOvc9kQzBlsVxK9_k5oEtP0c6I54ng0B&usqp=CAU",
    productBy: "Sealogix",
    descripton: "Some description",
    price: 10,
  });

  useEffect(() => {
    const getAuthData = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    };
    getAuthData();
  }, []);

  async function makePayment(token, addresses) {
    const response = await axios.post(
      "https://myflowerarchitect.com/account/checkout",
      { token, product }
    );
    const { status } = response.data;
    if (status === "succeeded") {
      console.log("Success! Check email for details");
    } else {
      console.log("Something went wrong");
    }
  }
  async function createGroup() {
    console.log("test");
    const user = await Auth.currentAuthenticatedUser();
    console.log(user.signInUserSession.idToken.jwtToken);
    const response = await axios.post(
      "https://api.myflowerarchitect.com/group/create",
      {
        tit: "titlefff",
        des: "descripiton of the group33",
        web: "www.google.com33",
        cat: "cat of the group33",
      },
      {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    );
    console.log(response);
  }
  if (user === null) {
    return null;
  }

  return (
    <React.Fragment>
      <NavBar backgroundColor="bg-gray-100" />
      <div className="container mx-auto my-2">
        <div className="lg:text-center my-10">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Flower Architect.
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Design you own Flower Arrangements
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Buy a membership now or sign-up for a limited free trial. Try the
            FLOWERPUZZLES game created with FlowerArchitect.
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center py-4 pt-0">
          {[...monthlyDeal, ...arrangementDeals]
            .filter((product) => {
              return !(
                product.type === user.attributes["custom:role"] ||
                (product.type === "basic" &&
                  user.attributes["custom:role"] === "club") ||
                (product.type === "basic" &&
                  user.attributes["custom:role"] === "designer") ||
                (product.type === "club" &&
                  user.attributes["custom:role"] === "designer")
              );
            })
            .map((deal, key) => (
              <div
                className="w-full transform  p-2 md:w-1/2 lg:w-1/4 plan-card"
                key={key}
              >
                <label className="flex flex-col  transform  rounded-lg shadow-2xl group relative cursor-pointer hover:shadow-2xl hover:bg-blue-500">
                  <div className="w-full px-4 py-6 rounded-t-lg card-section-1 border-t-2 border-pink-500">
                    <h3 className="mx-auto text-base font-semibold mb-2 text-center  text-blue-500 group-hover:text-white hover:bg-blue-500 transform transition duration-150 ease-in-out">
                      {deal.title}
                    </h3>

                    <p className="text-5xl font-bold text-center group-hover:text-white hover:bg-blue-500 text-blue-500">
                      ${deal.price.split(".")[0]}.
                      <span className="text-3xl">
                        {deal.price.split(".")[1]}
                      </span>
                    </p>
                    <p className="text-xs text-center uppercase group-hover:text-white hover:bg-blue-500 text-blue-500">
                      {deal.paymentType === "recurring"
                        ? "Monthly"
                        : "One time"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-lg bg-blue-500 hover:bg-blue-600 ">
                    <div className="description p-2 text-white w-full ">
                      <div className="flex flex-row items-center justify-self-start">
                        <h3
                          className="mx-auto text-base font-semibold mb-2 text-center text-xl font-semibold mr-4  text-white  transform transition duration-150 ease-in-out"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(e);
                            setActiveAccordion(deal.id);
                            //e.target.nextSibling.classList.toggle("hidden");
                          }}
                        >
                          {deal.title}
                        </h3>
                        {/*
          <div className="rounded-full bg-purple-600 text-gray-100 mr-3"><span className="font-semibold p-3">website</span></div>
          <div className="rounded-full bg-green-600 text-gray-100"><span className="font-semibold p-3">free</span></div>
          */}
                      </div>
                      <p>short description</p>
                    </div>
                    <hr className="mb-4 w-full border-blue-400"></hr>

                    <ul
                      className={`${
                        deal.id === activeAccordion ? "" : "hidden"
                      } `}
                    >
                      {deal.description.map((des, key) => (
                        <li
                          className="flex items-start text-white p-2 text-left"
                          key={key}
                        >
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-white"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <p className="ml-3 text-base font-medium ">{des}</p>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="w-2/3 text-center rounded-lg bg-white px-4 py-2 text-base font-semibold font-display  hover:text-teal-500 focus:outline-none focus:shadow-outline"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/checkout/${deal.id}`);
                      }}
                    >
                      BUY
                    </button>
                  </div>
                </label>
              </div>
            ))}
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
