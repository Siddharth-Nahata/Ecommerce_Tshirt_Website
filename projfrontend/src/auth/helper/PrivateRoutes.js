import React from "react";               //This file is for private route without authentication no body can use this.
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated()                           //It will tell whether the user is authenticated or not
          ? (
            <Component {...props} />                //If he is authenticated then mount this component
          )
          : (
            <Redirect                               //Otherwise redirect him to signin
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          )}
    />
  );
};

export default PrivateRoutes;
