import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
<Navbar backgroundColor="bg-gray-100" />

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            My Account
          </Typography>
          <Grid>
            <Grid container spacing={3}>
              <TextField
                id="storageTokensAvailable"  // mst + est - ast - bst - sst
                name="storageTokensAvailable"
                label="Storage Tokens Availablee"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="enlargementTokensAvailable" // eta
                name="enlargementTokensAvailable"
                label="Enlargement Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="emailTokensAvailable" // qta
                name="emailTokensAvailable"
                label="Email Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="venueStorageTokensAvailable" // avs + mve -ves
                name="availableVenueStorageTokens"
                label="Venue Storage Tokens Available"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="arrangementsStored" // ast
                name="arrangementsStored"
                label="Number of Arrangements Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="basketsStored" // bst
                name="basketsStored"
                label="Number of Baskets Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="scenesStored" // sst
                name="scenesStored"
                label="Number of Scenes Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="venueStored" // ves
                name="venueStored"
                label="Number of Venues Stored"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="maxUsers" // mus
                name="maxUsers"
                label="Maximum Users Available For Your Account"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="currentUsers" // qty
                name="currentUsers"
                label="Current Users Active On Your Account"
                fullWidth
                autoComplete="0"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="appStoreMonthlyDueDate" // app_store_monthly_due_date
                name="appStoreMonthlyDueDate"
                label="App Store Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="playStoreMonthlyDueDate" // play_store_monthly_due_date
                name="playStoreMonthlyDueDate"
                label="Play Store Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="stripeMonthlyDueDate" // stripe_monthly_due_date
                name="stripeMonthlyDueDate"
                label="Stripe Monthly Due Date"
                fullWidth
                autoComplete=""
              />
            </Grid>
          </Grid>
          

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
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
};
