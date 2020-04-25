import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import './App.css';

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

export default withAuthenticator(App);
