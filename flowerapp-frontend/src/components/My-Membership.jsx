import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
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
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            My Membership
          </Typography>
          <Grid>
            <Grid container spacing={3}>
              <TextField
                id="role"
                name="role"
                value={membershipData.role}
                label="Role"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="storageTokensAvailable" // mst + est - ast - bst - sst
                name="storageTokensAvailable"
                value={membershipData.storageTokensAvailable}
                label="Storage Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="enlargementTokensAvailable" // eta
                name="eta"
                value={membershipData.eta}
                label="Enlargement Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="emailTokensAvailable" // qta
                name="qta"
                value={membershipData.qta}
                label="Email Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="venueStorageTokensAvailable" // avs + mve - ves
                name="availableVenueStorageTokens"
                value={membershipData.availableVenueStorageTokens}
                label="Venue Storage Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="arrangementsStored" // ast
                name="ast"
                value={membershipData.ast}
                label="Number of Arrangements Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="basketsStored" // bst
                name="bst"
                value={membershipData.bst}
                label="Number of Baskets Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="scenesStored" // sst
                name="sst"
                value={membershipData.sst}
                label="Number of Scenes Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="venueStored" // ves
                name="ves"
                value={membershipData.ves}
                label="Number of Venues Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="maxUsers" // mus
                name="mus"
                value={membershipData.mus}
                label="Maximum Users Available For Your Account"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="currentUsers" // qty
                name="qty"
                value={membershipData.qty}
                label="Current Users Active On Your Account"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="appStoreMonthlyDueDate" // app_store_monthly_due_date
                name="app_store_monthly_due_date"
                value={membershipData.app_store_monthly_due_date}
                label="App Store Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="playStoreMonthlyDueDate" // play_store_monthly_due_date
                name="play_store_monthly_due_date"
                value={membershipData.play_store_monthly_due_date}
                label="Play Store Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="stripeMonthlyDueDate" // stripe_monthly_due_date
                name="stripe_monthly_due_date"
                value={membershipData.stripe_monthly_due_date}
                label="Stripe Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                history.push("/");
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
        </Paper>
      </main>
    </React.Fragment>
  );
};
