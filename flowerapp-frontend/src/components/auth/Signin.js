import React, { useState,useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import queryString from 'query-string';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
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
        console.log("Enter username and password", "error");
        return;
      }
      const user = await Auth.signIn(username, password);
      console.log(user);
      console.log(`Welcome ${user.username}`);
      history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      console.log(err.message, "error");
      console.log(err);
    }
  };
  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
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
      history.push("/reset-password");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      console.log(err.message, "error");
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(history)
    const values = queryString.parse(history.location.search);
    console.log(values);
    if(values.signup){
      setOpen(true);

    }

  }, [history]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <React.Fragment>
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`You have successfully registered. \n Before login please verify your account. We have sent you an email click on the confirmation link to verify your account.`}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
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
                      id="username"
                      label="Email/ Username"
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
