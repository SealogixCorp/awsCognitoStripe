import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Appbar from "./Appbar";

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
      <Appbar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            My Profile
          </Typography>
          <Grid>
            <Grid container spacing={3}>
              <TextField
                id="name"
                name="name"
                label="Full Name"
                fullWidth
                autoComplete="Full Name"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="userName"
                name="userName"
                label="User Name"
                fullWidth
                autoComplete="User Name"
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                id="userName"
                name="userName"
                label="User Name"
                fullWidth
                autoComplete="User Name"
              />
            </Grid>
          </Grid>

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
