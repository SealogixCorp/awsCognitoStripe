import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { useToasts } from "react-toast-notifications";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
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
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  /**
   *
   *
   * @param {*} event
   * funtional
   */
  const handleResetPasswordSubmit = async event => {
    event.preventDefault();
    try {
      if (!username || !password || !code) {
        console.log("Enter username and password", "error");
        return;
      }
      const user = await Auth.forgotPasswordSubmit(username, code, password);
      console.log(user);
      addToast("Password reset successfully!", {
        appearance: "success",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
      history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      console.log(err.message, "error");
      addToast(err.message, {
        appearance: "error",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
      console.log(err);
    }
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
            Reset password
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="code"
                  label="Code"
                  type="text"
                  id="Code"
                  autoComplete="current-code"
                  value={code}
                  onChange={event => setCode(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleResetPasswordSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset password
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};
