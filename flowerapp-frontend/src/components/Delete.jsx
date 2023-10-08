import React, {  useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from  "./Navbar";
import { useToasts } from "react-toast-notifications";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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
}));

export default () => {
  const [verificationInput, setVerificationInput] = useState('');
  const navigate = useNavigate()
  const classes = useStyles();
  const {addToast} = useToasts();
  const handleChange = (event) => {
    setVerificationInput(event.target.value);
  };

  const deleteProfile = async (e) => {
    e.preventDefault();
        if (verificationInput.toLocaleUpperCase() === 'DELETE MY ACCOUNT') {
        try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await axios.post(
        "https://api.myflowerarchitect.com/arranger/account/delete",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          }
        }
      );
        console.log(e);
        addToast("Account deleted succcesfully ", {
        appearance: "success",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
      Auth.signOut();
      localStorage.removeItem("identity_id");
      localStorage.removeItem("JWT_TOKEN_KEY");
      navigate("/signin");
    } catch (e) {
      console.log(e);
        addToast("There is an error while deleting the account", {
        appearance: "error",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
    }
    } else {
  addToast("Type the phrase DELETE ACCOUNT for account deletion", {
        appearance: "error",
        autoDismiss: true,
        PlacementType: "top-right",
        autoDismissTimeout: 6000
      });
    }

  };


  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <div className="bg-white shadow-lg rounded-md p-4 m-4">
          <form className="w-full max-w-lg" onSubmit={deleteProfile}>
            <h1 className="text-3xl center my-4 text-center"> Delete Account</h1>
           <div className="p-4">
        <div>

          <input
            className="border p-2 mt-2 block w-full"
            type="text"
            value={verificationInput}
            onChange={handleChange}
          />
        </div>
        <div>
           <p className="text-slate-500 mt-2 mb-4 text-xs">
            Your Account and all data will be PERMANENTLY DELETED type <strong className="text-red-500">"DELETE MY ACCOUNT"</strong>
          </p>
            <div className="text-center my-8">
              <input
                type="submit"
                value="Delete Account"
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md text-white"
              />
            </div>
        </div>
    </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
};
