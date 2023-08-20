import React from "react";
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import {Amplify} from "aws-amplify";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";
import './styles/tailwind.css';


import App from "./App";
import config from "./config";
import * as serviceWorker from "./serviceWorker";


Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    // REQUIRED - Amazon Cognito Region
    region: config.cognito.REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.cognito.USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <BrowserRouter>
   <ToastProvider>
      <CssBaseline />
      <App />
    </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <ToastProvider>
//       <CssBaseline />
//       <App />
//     </ToastProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
