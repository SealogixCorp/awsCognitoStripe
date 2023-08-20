import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import TextField from "@material-ui/core/TextField";
import ReCAPTCHA from "react-google-recaptcha";

import localeList from "../../core/locale.json";
import NavBar from "../Appbar";

export default () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
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
      navigate("/signin");
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
      <div className="container mx-auto flex justify-center">
        <div className="rounded-md shadow-lg bg-gray-100 border my-6 p-4 border-gray-100 flex flex-col w-1/3 items-center justify-center">
<div className="w-20 h-20 rounded-full bg-pink-600 flex  justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
</svg>
        </div>
          <h1 className="text-gray-600 text-2xl text-center mx-3">
            Sign up
          </h1>
          <form className="w-full" noValidate>
          <div className="flex flex-col my-2 space-y-2">
          <label className="text-gray-600 font-semibold block">Full Name</label>


                <input
                type="text"
                 className="rounded p-2 border"
                  autoComplete="fname"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  name="name"
                  required
                  id="name"
                  autoFocus
                />
</div>
          <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">Email</label>
                <input
                 className="rounded p-2 border"
                type="email"
                  required 
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </div>
             <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">User Name</label>
                <input
                  type="text"
                   className="rounded p-2 border"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </div>
              <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">Password</label>
                <input
                  required
                   className="rounded p-2 border"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
             <div className="flex flex-col my-2 space-y-2">
              <label className="text-gray-600 font-semibold block">Local</label>
                <TextField
                  id="locale"
                  select
                  required
                  fullWidth
                  label="Locale"
                  value={locale}
                   className="rounded p-2 border"
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
              </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-700 my-2 p-4 font-semibold block text-center w-full rounded text-white"
            >
              Sign Up
            </button>
            <ReCAPTCHA
              sitekey="6Lez_6IZAAAAAHBg2EcyW9fKy-CJJoFg0XKFjV1x"
              onChange={varifyHumanCallback}
            />
           <div className="flex justify-end">
             
                <button className="bg-transparent text-blue-400 m-1 "
                      onClick={() => {
                        navigate("signin");
                      }}>
                  Already have an account? Sign in
                </button>
             
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
