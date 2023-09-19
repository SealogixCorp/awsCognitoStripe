import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


import axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Auth } from "aws-amplify";
//import {stripePromise} from "../core/stripe"
import { monthlyDeal, arrangementDeals } from "../core/products";
import { PricingTable } from "./pricingtable/PricingTable";

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
  const navigate = useNavigate();
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

    } else {
      console.log("Something went wrong");
    }
  }
  async function createGroup() {
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
      
          <PricingTable />
    <div className="p-6 m-4 border rounded shadow text-xl ">
 
    Free (App Store and Play Store Versions Only)
    <br />
    {"  "}- Guided Instructions to create a<br />
    {"        "}1.) A flower ball arrangement
    <br />
    {"        "}2.) A wristlet Corsage.
    <br />
    {"        "}3.) Mixed Flower Vase Arrangement (Chose from 3 color schemes)
    <br />
    {"  "}- Baskets - A pre defined basket of flower for each arrangement above
    <br />
    {"  "}- Share -{"  "}share Your arrangement with your friends or send to
    Pinterest
    <br />
    <br />
    Basic - $9.99 per month, 109.99 per year
    <br />
    Month
    <br />
    Year https://buy.stripe.com/fZe5nu8e85yO7Zu7st
    <br />
    <br />
    {"  "}- Flower Library - full access to flower image database over 1800
    flowers and thousands of embellishments (vases, containers, birds,
    butterflies, jewels, feathers, fruit, etc)
    <br />
    {"  "}- Samples - basic arrangement &amp; basket samples library (Vase,
    wristlet, bridal and few more types)
    <br />
    {"  "}- 10 Storage Tokens -{"  "}each storage token allows for storage of
    one basket or arrangement as long as you membership is current
    <br />
    {"  "}- 1 Enlargement Token - sends to Zenfolio photographers website and
    enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts,
    etc) (one time use)
    <br />
    {"  "}- Share -{"  "}share Your arrangement with your friends or send to
    Pinterest
    <br />
    <br />
    Enhanced - $14.99 per month, 164.99 per year
    <br />
    {"  "}- Flower Library - full access to flower image database over 1800
    flowers and thousands of embellishments (vases, containers, birds,
    butterflies, jewels, feathers, fruit, etc)
    <br />
    {"  "}- Samples - Full arrangement &amp; basket samples library (Vase,
    wristlet, bridal and few more types)
    <br />
    {"  "}- 50 Storage Tokens. each storage token allows for storage of one
    basket,{"  "}arrangement or scene{"  "}as long as you membership is current
    <br />
    {"  "}- Collages - Access to pre-defined color coordinated flower Collages
    with associated baskets
    <br />
    {"  "}- 4 Storage Tokens for high Resolution Venue Background Images for
    your scenes
    <br />
    {"  "}- Scenes - ability to Create Scenes with your background image and
    your arrangements placed in scene. upload and store 10{"  "}background
    images (venues ){"  "}as long as you membership is current
    <br />
    {"  "}- 2 Enlargement Tokens - sends to Zenfolio photographers website and
    enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts,
    etc) (one time use) refesh monthly
    <br />
    {"  "}- Shape Aid Templates - 22 Templates To layout on the canvas to assist
    in the layout of your flower arrangements
    <br />
    {"  "}- Share -{"  "}share Your arrangement with your friends or send to
    Pinterest
    <br />
    <br />
    Designer (Recommended for Brides) $19.99 per month, $219.99 per year
    <br />
    {"  "}- Flower Library - full access to flower image database over 1800
    flowers and thousands of embellishments (vases, containers, birds,
    butterflies, jewels, feathers, fruit, etc)
    <br />
    {"  "}- Samples - full samples library of arrangements and baskets grouped
    by (vase arrangement, bridal bouquet, wristlet, tropical, wildflower, etc.)
    <br />
    {"  "}- 200 Storage Tokens. each storage token allows for storage of one
    basket,{"  "}one arrangement one scene, or one custom image{"  "}as long as
    you membership is current
    <br />
    {"  "}- 10 Storage Tokens for high Resolution Venue Background Images for
    your scenes
    <br />
    {"  "}- Scenes - ability to Create Scenes with your background image and
    your arrangements placed in scene. upload and store 10{"  "}background
    images (venues ){"  "}as long as you membership is current
    <br />
    {"  "}- Garlands - ability to Create Garlands in Scenes utilizing flowers,
    arrangements, and extras(butterflys, fruit, jewels, etc.)
    <br />
    {"  "}- 4 Enlargement Tokens - sends to Zenfolio photographers website and
    enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts,
    etc) (one time user) refresh monthly
    <br />
    {"  "}- Groups - Ability to create groups and invite friends and share you
    arrangements, baskets, and scenes
    <br />
    {"  "}- 5 Quotations - Ability to send emails with quotation PDF request pdf
    show your arrangement, associated flower list and your instructions (card,
    vase, size, etc) (one time use) (refresh montlyl)
    <br />
    {"  "}- Color Wheel{"  "}- search for flower that match color wheel
    <br />
    {"  "}- Collages - Access to full pre-defined color coordinated flower
    Collages with associated baskets
    <br />
    {"  "}- Flower Data Library - Data library for each flower category (200+)
    (seasonal availability, relative cost, vase life, shape, texture, etc.)
    <br />
    {"  "}- Menu Driven search of flower database by example from menu dropdowns
    <br />
    {"  "}- Share -{"  "}share Your arrangement with your friends or send to
    Pinterest
    <br />
    <br />
    Extras
    <br />
    {"   "}Storage Tokens - 25 extra Tokens for more storage to add to your
    membership (each token can be used to store a basket, arrangement, image, or
    scene for $9.99 dollars
    <br />
    {"   "}Enlargement Tokens- 10 1 time use for $4.99 dollars sends to Zenfolio
    photographers website and enlarge to 300dpi and download (Also store to buy
    prints, oils, t-shirts, etc) (one time use)
    <br />
    {"   "}Venue Tokens - store extra venue images with your membership 10 for a
    $4.99 dollars
    <br />
    {"   "}Quotation Tokens - extra 1 time use email/quotation tokens 50 for a
    $4.99 dollars
    <br />
    <br />
    yearly prices (monthly price times 11) one month free

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
