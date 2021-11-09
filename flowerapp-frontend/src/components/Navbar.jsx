import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
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


const Navbar = ({ backgroundColor = "bg-gray-900" }) => {
  const history = useHistory();
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


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Auth.signOut();
    history.push("/signin");
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };



  return(
  <nav className={`${backgroundColor} shadow-md`}>
    <div className="max-w-7xl mx-auto px-12">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed. */}
            {/*
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          */}
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Icon when menu is open. */}
            {/*
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          */}
            <svg
              className="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                  <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" /> */}
                  <a href="/" className="   px-3 py-2 rounded-md text-sm font-medium">
             <img className="block h-8 w-auto" src="/logo.png" alt="logo"  />
             </a>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-xs ">
          {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button> */}
          {auth ? (
        <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <a href="https://www.flowerarchitect.club" target="_blank" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a> 
          <a href="https://myflowerarchitect.com/arranger.html" target="_blank" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Arrange Flowers</a> 
          <a href="/account/membership" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Memebership</a>
          <a href="/my-groups" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Groups</a>
          <a href="/group/create" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Group</a>
          <a href="#" className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Languages</a>
        
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
                    history.push("/account/profile");
                  }}
                > My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>        
            </div>

      </div>
          ) :
            (
          <button
          className="text-gray-800 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Login
          </button>
        )}
          {/* Profile dropdown */}
          {/* <div className="ml-3 relative">
            <div>
              <button
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Sign out
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    {/*
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  */}
    <div className="hidden sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
        <a
          href="#"
          className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Team
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Projects
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Calendar
        </a>
      </div>
    </div>
  </nav>
);
}
export default Navbar;
