import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
  const [forgotPassword, setForgotPassword] = useState(false);
  const [varifyHuman, setVarifyHuman] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  /**
   *
   *
   * @param {*} event
   * funtional
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (!username || !password) {
        addToast(
          "Enter username and password",
          {
            appearance: "error",
            autoDismiss: true,
            PlacementType: "top-right",
            autoDismissTimeout: 6000
          })
        console.log("Enter username and password", "error");
        return;
      }
      if(!varifyHuman){
        addToast(
          "Please varify that you are human",
          {
            appearance: "error",
            autoDismiss: true,
            PlacementType: "top-right",
            autoDismissTimeout: 6000
          })

        return;
      }

      const user = await Auth.signIn(username, password);
      localStorage.setItem("JWT_TOKEN_KEY",`${user.keyPrefix}.${user.username}.idToken`);
      console.log(user);
      console.log(`Welcome ${user.username}`);
      history.push("/");
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

  const handleForgotSubmit = async event => {
    event.preventDefault();
    try {
      if (!username) {
        console.log("Enter username and password", "error");
        return;
      }
      const user = await Auth.forgotPassword(username);
      console.log(user);
      console.log(`Welcome ${user.username}`);
      addToast(
        "We send you code for reset password. Please enter the code sent in email",
        {
          appearance: "success",
          autoDismiss: true,
          PlacementType: "top-right",
          autoDismissTimeout: 6000
        }
      );
      history.push("/reset-password");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
      console.log(err.message, "error");
      console.log(err);
    }
  };
  const varifyHumanCallback = (token)=>{
    console.log(token);
    if(token) setVarifyHuman(true);
  }
  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
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

          {forgotPassword ? (
            <>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      placeHolder="Enter username"
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={event => setUsername(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={handleForgotSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send Code
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={handleForgotPassword}
                    >
                      Back to login form?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Email/ Username"
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
                </Grid>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <ReCAPTCHA
        sitekey="6Lez_6IZAAAAAHBg2EcyW9fKy-CJJoFg0XKFjV1x"
        onChange={varifyHumanCallback}
      />

                <Grid container>
                  <Grid item xs>
                    <Link variant="Button" onClick={handleForgotPassword}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      variant="Button"
                      onClick={() => {
                        history.push("signup");
                      }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </div>
      </Container>
    </React.Fragment>
  );
};
