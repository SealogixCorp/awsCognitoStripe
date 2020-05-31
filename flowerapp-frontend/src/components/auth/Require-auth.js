//HoC for check authentication
//HoC for check authentication
import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default ComposedComponent => {
  class RequireAuth extends Component {
    async componentWillMount() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        if (!user) {
          this.props.history.push("/signin");
        }
      } catch (e) {
        this.props.history.push("/signin");
      }
    }
    async componentWillUpdate() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (!user) {
          this.props.history.push("/signin");
        }
      } catch (e) {
        this.props.history.push("/signin");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return RequireAuth;
};
