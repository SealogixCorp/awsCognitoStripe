import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import ReCAPTCHA from "react-google-recaptcha";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import localeList from "../../core/locale.json";
import NavBar from "../Appbar";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [varifyHuman, setVarifyHuman] = useState(false);
  const [locale, setLocale] = useState("en");

  /**
   *
   *
   * @param {*} event
   * funtional
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (!username || !email || !password) {
        addToast("Please fill the signup form", {
          appearance: "error",
          autoDismiss: true,
          PlacementType: "top-right",
          autoDismissTimeout: 6000
        });
        return;
      }
      if (!varifyHuman) {
        addToast("Please varify that you are human", {
          appearance: "error",
          autoDismiss: true,
          PlacementType: "top-right",
          autoDismissTimeout: 6000
        });

        return;
      }
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          name: name,
          locale: locale
        }
      });
      console.log("Singup Successful!");
      addToast(
        "You have successfully registered. \n Before login please verify your account. We have sent you an email click on the confirmation link to verify your account.",
        {
          appearance: "success",
          autoDismiss: true,
          PlacementType: "top-right",
          autoDismissTimeout: 6000
        }
      );
      history.push("/signin");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);

      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
      console.log(err);
    }
  };
  const handleChange = event => {
    setLocale(event.target.value);
  };
  const varifyHumanCallback = token => {
    console.log(token);
    if (token) setVarifyHuman(true);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="locale"
                  select
                  required
                  fullWidth
                  label="Locale"
                  value={locale}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select your locale"
                  variant="outlined"
                >
                  {Object.entries(localeList).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <ReCAPTCHA
              sitekey="6Lez_6IZAAAAAHBg2EcyW9fKy-CJJoFg0XKFjV1x"
              onChange={varifyHumanCallback}
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};
