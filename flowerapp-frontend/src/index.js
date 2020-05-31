import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";

import App from "./App";
import config from "./config";
import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: config.cognito.USER_POOL_ID,
    // REQUIRED - Amazon Cognito Region
    region: config.cognito.REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.cognito.USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});
ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <CssBaseline />
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
