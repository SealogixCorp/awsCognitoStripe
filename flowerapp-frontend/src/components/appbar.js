import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  logo: {
    maxWidth: 160
  }
}));

export default () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const isAuthincated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user.attributes) {
        console.log(user);
        setAuth(user.attributes);
      }
    } catch (e) {
      setAuth(null);
    }
  };
  useEffect(() => {
    isAuthincated();
  }, []);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Auth.signOut();
    navigate("/signin");
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <img src="logo.png" alt="logo" className={classes.logo} />
        </Typography>

        {auth ? (
          <React.Fragment>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                MY ACCOUNT
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                MY MEMEBERSHIP
              </Link>
              <Link
                onClick={() => {
                  navigate("/my-groups");
                }}
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
                MY GROUPS
              </Link>
              <Link
                onClick={() => {
                  navigate("/group/create");
                }}
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
              CREATE GROUP
               
              </Link>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Languages
              </Button>
            </nav>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </React.Fragment>
        ) : (
          <Button
            onClick={() => {
              navigate("/signin");
            }}
          >
            LOGIN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
