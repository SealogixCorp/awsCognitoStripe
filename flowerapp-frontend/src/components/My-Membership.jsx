import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import axios from "axios";
<Navbar backgroundColor="bg-gray-100" />;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [membershipData, setMembershipData] = useState();
  useEffect(() => {
    const getMembershipData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const response = await axios.get(
          `https://api.myflowerarchitect.com/arranger/account/membership`,
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
        let md = response.data.data;

        md["storageTokensAvailable"] =
          md["mst"] + md["est"] - md["ast"] - md["bst"] - md["sst"];
        md["availableVenueStorageTokens"] = md["avs"] + md["mve"] - md["ves"];
        console.log(md);
        setMembershipData(md);
      } catch (e) {
        console.log(e);
      }
    };
    getMembershipData();
  }, []);
  if (!membershipData) {
    return null;
  }

  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <div className="bg-white shadow-lg rounded-md p-4 m-4">
          <form className="w-full max-w-lg">
            <h1 className="text-3xl center my-4 text-center"> My Profile</h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="role"
                  name="role"
                  value={membershipData.role}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="storageTokensAvailable"
                >
                  Storage Tokens Available
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="storageTokensAvailable"
                  name="storageTokensAvailable"
                  value={membershipData.storageTokensAvailable} // mst + est - ast - bst - sst
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="enlargementTokensAvailable"
                >
                  Enlargement Tokens Available
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="enlargementTokensAvailable"
                  name="eta"
                  value={membershipData.eta}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="emailTokensAvailable"
                >
                  Email Tokens Available
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="emailTokensAvailable"
                  name="qta"
                  value={membershipData.qta}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="venueStorageTokensAvailable"
                >
                  Venue Storage Tokens Available
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="venueStorageTokensAvailable"
                  name="role"
                  value={membershipData.availableVenueStorageTokens} // avs + mve - ves
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="arrangementsStored"
                >
                  Number of Arrangements Stored
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="arrangementsStored"
                  name="ast"
                  value={membershipData.ast}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="basketsStored"
                >
                  Number of Baskets Stored
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="basketsStored"
                  name="bst"
                  value={membershipData.bst}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="scenesStored"
                >
                  Number of Scenes Stored
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="scenesStored"
                  name="sst"
                  value={membershipData.sst}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="venueStored"
                >
                  Number of Venues Stored
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="venueStored"
                  name="ves"
                  value={membershipData.ves}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="maxUsers"
                >
                  Maximum Users Available For Your Account
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="maxUsers"
                  name="mus"
                  value={membershipData.mus}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="currentUsers"
                >
                  Current Users Active On Your Account
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="currentUsers"
                  name="qty"
                  value={membershipData.qty}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="appStoreMonthlyDueDate"
                >
                  App Store Monthly Due Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="appStoreMonthlyDueDate"
                  name="app_store_monthly_due_date"
                  value={membershipData.app_store_monthly_due_date}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="playStoreMonthlyDueDate"
                >
                  Play Store Monthly Due Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="playStoreMonthlyDueDate"
                  name="play_store_monthly_due_date"
                  value={membershipData.play_store_monthly_due_date}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="stripeMonthlyDueDate"
                >
                  Stripe Monthly Due Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  id="stripeMonthlyDueDate"
                  name="stripe_monthly_due_date"
                  value={membershipData.stripe_monthly_due_date}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              useNavigate("/");
            }}
          >
            Upgrade
          </Button>
        </div>

        {/* s1 = "SELECT "
    s1 += "json_build_object( "
    s1 += "'ast', ast, " # Number of arrangements stored currently
    s1 += "'avs', avs, " # Additional venue storage purchased
    s1 += "'bst', bst, " # Number backets stored currently
    s1 += "'est', est, " # Additional Storage Tokens purchased above membership storage limit
    s1 += "'eta', eta, " # Currently Available  Enlargement tokens available for one time use
    s1 += "'app_store_monthly_due_date', app_store_monthly_due_date, " #  Next Monthly Due Date for APP Store Purchased Membership
    s1 += "'lmr', lmr, " # Date of last update monthly replenishment to Enlargements & Email Tokens quantities provided by your membership
    s1 += "'mst', mst, " # Storage Tokens provided by your monthly membership type
    s1 += "'mus', mus, " # Max users available for this membership type
    s1 += "'mve', mve, " # Max venues storage based on membership type
    s1 += "'play_store_monthly_due_date', play_store_monthly_due_date, " # Next Monthly Due Date for Play StorePurchased Membership
    s1 += "'qta', qta, " # Number of Email Qotation / Card tokens available for one time use
    s1 += "'qty', qty, " # Number of users Active on this membership
    s1 += "'stripe_monthly_due_date', stripe_monthly_due_date, " # Next Monthly Due Date for Stripe Purchased Membership
    s1 += "'sst', sst, " # Number of scenes stored currently
    s1 += "'ves', ves " # Number venues stored currently
    s1 += ") "
    s1 += "FROM "
    s1 += "membership "
    s1 += "WHERE usr = %(userId)s "  */}
      </main>
    </React.Fragment>
  );
};
