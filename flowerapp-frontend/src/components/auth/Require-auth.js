//HoC for check authentication
//HoC for check authentication
import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default ComposedComponent => {
  class RequireAuth extends Component {
    async componentWillMount() {
      try {
        console.log(Auth);
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        if (!user) {
          this.props.history.push("/signin");
        }
      } catch (e) {
        this.props.history.push("/signin");
        console.log(e);
      }
    }
    async componentWillUpdate() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        if (!user) {
          console.log();
          this.props.history.push("/signin");
        }
      } catch (e) {
        this.props.history.push("/signin");
        console.log(e);
      }
    }

    render() {
      console.log(this.props);
      return <ComposedComponent {...this.props} />;
    }
  }
  return RequireAuth;
};
