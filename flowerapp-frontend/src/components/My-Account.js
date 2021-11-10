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
  const [profile, setProfile] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const response = await axios.get(
          `https://api.myflowerarchitect.com/arranger/account/profile`,
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
        // console.log(response.data.data.profile);

        setProfile(JSON.parse(response.data.data.profile));
        setRole(response.data.data.role);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
    console.log(profile);
  }, []);
  if (!profile) {
    return null;
  }

  const ifDesigner = (role) => {
    if (role === "basic" || role === "club") {
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.signInUserSession.idToken.jwtToken);
      const response = await axios.post(
        "https://api.myflowerarchitect.com/arranger/account/profile/update",
        { ...profile },
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
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    if (e.target.id.includes("address.")) {
      setProfile({
        ...profile,
        address: {
          ...profile.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.id.includes("shipping.")) {
      setProfile({
        ...profile,
        shipping: {
          ...profile.shipping,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
      return;
    }
  };

  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Role Type = {role}
          </Typography>
          {!ifDesigner(role) && (
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
          )}
          <Typography component="h1" variant="h4" align="center">
            My Profile
          </Typography>
          <Grid>
            <Grid container spacing={3}>
              <TextField
                id="name"
                name="name"
                value={profile.name}
                label="Full Name"
                fullWidth
                autoComplete="Full Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="username"
                name="username"
                value={profile.username}
                label="User Name"
                fullWidth
                autoComplete="User Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="gender"
                name="gender"
                value={profile.gender}
                label="Gender"
                fullWidth
                autoComplete="M or F"
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="locaton"
                name="location"
                value={profile.location}
                label="Location"
                fullWidth
                autoComplete="Location"
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="website"
                name="website"
                value={profile.website}
                label="Your Website"
                fullWidth
                autoComplete="https://www..."
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="picture"
                name="picture"
                value={profile.picture}
                label="Picture"
                fullWidth
                autoComplete="Link to Your picture"
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="phone"
                name="phone"
                value={profile.phone}
                label="Phone"
                fullWidth
                autoComplete="01-734-555-1212"
                onChange={handleChange}
              />
            </Grid>
            <div className="mt-8">
              <Typography component="h1" variant="h4" align="center">
                My Mailing Address
              </Typography>
              <Grid container spacing={3}>
                <TextField
                  id="address.line1"
                  name="line1"
                  value={profile.address.line1}
                  label="Line 1"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="address.line2"
                  name="line2"
                  value={profile.address.line2}
                  label="Line 2"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="address.city"
                  name="city"
                  value={profile.address.city}
                  label="City"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="address.state"
                  name="state"
                  value={profile.address.state}
                  label="State"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="address.zip"
                  name="zip"
                  value={profile.address.zip}
                  label="Zip"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="address.country"
                  name="country"
                  value={profile.address.country}
                  label="Country"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
            </div>
            <div className="mt-8">
              <Typography component="h1" variant="h4" align="center">
                My Shipping Address
              </Typography>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.line1"
                  name="line1"
                  value={profile.shipping.line1}
                  label="Line 1"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.line2"
                  name="line2"
                  value={profile.shipping.line2}
                  label="Line 2"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.city"
                  name="city"
                  value={profile.shipping.city}
                  label="City"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.state"
                  name="state"
                  value={profile.shipping.state}
                  label="State"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.zip"
                  name="zip"
                  value={profile.shipping.zip}
                  label="Zip"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
              <Grid container spacing={3}>
                <TextField
                  id="shipping.country"
                  name="country"
                  value={profile.shipping.country}
                  label="Country"
                  fullWidth
                  autoComplete=""
                  onChange={handleChange}
                />
              </Grid>
            </div>
          </Grid>

          {/* returnData = {
'email': boto3.client('kms').decrypt(CiphertextBlob=b64decode(bytes.fromhex(userData['encrypted_email'])))['Plaintext'].decode('utf-8'),
'name': boto3.client('kms').decrypt(CiphertextBlob=b64decode(bytes.fromhex(userData['encrypted_name'])))['Plaintext'].decode('utf-8'),
'username': boto3.client('kms').decrypt(CiphertextBlob=b64decode(bytes.fromhex(userData['encrypted_username'])))['Plaintext'].decode('utf-8'),
'role': userData['rol'],
'location': userData['location'],
'lang': userData['lang'],
'profile': profile,
'zen' : userData['zen']
} */}

          {/* Contents of profile */}
          {/* name: { type: String, default: "", index: true },
gender: { type: String, default: "" },
location: { type: String, default: "" },
website: { type: String, default: "" },
picture: { type: String, default: "" },
phoneNumber: { type: String, default: "" },
email: { type: String, default: "" },
region: "us-west-2",
userPoolId: "us-west-2_f5jKM0twH"
"clientId": "4ba0p0nr4gni41ubqt36i05gde",
address: {
'line1: '', # (e.g., street, PO Box, or company name)
'city': "", # City
'state': '', #State, county, province, or region.
'postal_code': # ZIP or postal code.
'country' 'US'
},
shipping: {
'address': {
'line1: '', # (e.g., street, PO Box, or company name) encrypted
'line2' '', # (e.g., apartment, suite, unit, or building) encrypted
'city': "", # City
'state': '', #State, county, province, or region.
'postal_code': # ZIP or postal code.
'country' 'US'
},
'name': '', encrypted
'phone': '' encrypted
}
},
gdpr: { type: Boolean, default: false }, // GDPR agreement. */}

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={updateProfile}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
};
