import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const RequireAuth = (ComposedComponent) => {
  const WrapperComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          if (!user) {
            navigate("/signin");
          }
        } catch (e) {
          navigate("/signin");
        }
      };

      checkAuthentication();
    }, [navigate]);

    return <ComposedComponent {...props} />;
  };

  return WrapperComponent();
};

export default RequireAuth;