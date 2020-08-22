import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "../Appbar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
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
  const validate = values => {
    const errors = {};
    if (!values.tit) {
      errors.tit = "Required";
    } else if (values.tit.length > 50) {
      errors.tit = "Must be 50 characters or less";
    }

    if (!values.cat) {
      errors.cat = "Required";
    } else if (values.cat.length > 50) {
      errors.lastName = "Must be 50 characters or less";
    }

    if (!values.des) {
      errors.des = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      tit: "",
      cat: "",
      des: "",
      web: ""
    },
    validate,
    onSubmit: async values => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user.signInUserSession.idToken.jwtToken);
        const response = await axios.post(
          "https://cors-anywhere.herokuapp.com/https://api.myflowerarchitect.com/group/create",
          { ...values },
          {
            headers: {
              Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"
            }
          }
        );
        console.log(response);
        console.log("Group created Successful!");
        addToast("You have successfully created . \n", {
          appearance: "success",
          autoDismiss: true,
          PlacementType: "top-right",
          autoDismissTimeout: 6000
        });
        history.push("/my-groups");
      } catch (e) {
        console.log(e);
      }
    }
  });

  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavBar />

      <Container className={classes.layout}>
        <Paper className={classes.paper}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Group
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    onChange={formik.handleChange}
                    value={formik.values.tit}
                    name="tit"
                    variant="outlined"
                    required
                    fullWidth
                    id="tit"
                    label="Title"
                    autoFocus
                  />
                  {formik.errors.tit ? <div>{formik.errors.tit}</div> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="des"
                    label="Description"
                    name="des"
                    onChange={formik.handleChange}
                    value={formik.values.des}
                  />
                  {formik.errors.des ? <div>{formik.errors.des}</div> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="catch"
                    label="cat"
                    name="cat"
                    autoComplete="Category"
                    onChange={formik.handleChange}
                    value={formik.values.cat}
                  />
                  {formik.errors.cat ? <div>{formik.errors.cat}</div> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="web"
                    label="Web"
                    type="web"
                    id="web"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.web}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Group
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
