import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import './App.css';

const signUpConfig = {
  header: 'Create an Account',
  hideAllDefaults: false,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },

    {
      label: 'Gender',
      key: 'gender',
      required: true,
      displayOrder: 4,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 5,
      type: 'password'
    },
    {
      label: 'Locale',
      key: 'locale',
      required: true,
      displayOrder: 7,
      type: 'string'
    }
  ]
};
function App() {

  return (
    <React.Fragment>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Home} />
        </Switch>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default withAuthenticator(App,{signUpConfig});
