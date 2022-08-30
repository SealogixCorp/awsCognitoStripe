import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import NavBar from "../Navbar";

export default () => {
  const { addToast } = useToasts();
  const history = useHistory();
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
      const credentials = await Auth.currentCredentials();
      localStorage.setItem("JWT_TOKEN_KEY",`${user.keyPrefix}.${user.username}.idToken`);
      localStorage.setItem('identity_id',JSON.stringify(credentials));
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
      <NavBar backgroundColor="bg-gray-100" />
      <div className="container mx-auto flex justify-center">
        <div className="rounded-md shadow-lg bg-gray-100 border my-6 p-4 border-gray-100 flex flex-col w-1/3 items-center justify-center">
          
        <div className="w-20 h-20 rounded-full bg-pink-600 flex  justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
</svg>
        </div>
          {forgotPassword ? (
            <>
               <h1 className="text-gray-600 text-2xl text-center mx-3">
                Forgot Password
              </h1>
              <form className="w-full"  noValidate>
              <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">User Name</label>
              <input
              className="rounded p-2 border"
                required
                placeholder="Enter username"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              </div>
                <button
                  onClick={handleForgotSubmit}
                  type="submit"
                  className="bg-blue-700 my-2 p-4 font-semibold block text-center w-full rounded text-white"
                >
                  Send Code
                </button>
                <div className="flex justify-end">
                    <button
                      className="bg-transparent text-blue-400 m-1 "
                      onClick={handleForgotPassword}
                    >
                      Back to login form?
                    </button>
                  </div>
           
              </form>
            </>
          ) : (
            <>
              <h1 className="text-gray-600 text-2xl text-center mx-3">
                Sign In
              </h1>
              <form className="w-full"   noValidate>
              <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">Email/ Username</label>
              <input
              className="rounded p-4 shadow-inner border"
                required
                placeholder="Enter username"
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              </div>

                <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">Password</label>
              <input
              className="rounded p-4 shadow-inner border"
                required
                 name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
              />
              </div>
                <button
                  onClick={handleSubmit}
                  type="submit"

                  className="bg-blue-700 my-2 p-4 font-semibold block text-center w-full rounded text-white"
                >
                  Sign In
                </button>
                <ReCAPTCHA
                className="w-full"
        sitekey="6Lez_6IZAAAAAHBg2EcyW9fKy-CJJoFg0XKFjV1x"
        onChange={varifyHumanCallback}
      />

                <div className="flex justify-between ">
                
                    <button className="bg-transparent text-blue-400 m-1 " onClick={handleForgotPassword}>
                      Forgot password?
                    </button>
                    <button className="bg-transparent text-blue-400 m-1 "
                      onClick={() => {
                        history.push("signup");
                      }}
                    >{"Don't have an account? Sign Up"}
                    </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
