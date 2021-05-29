import React from "react"
import { Route, Redirect } from "react-router-dom"
import {withAuth} from "../../HOC";

// Redirect all un-authorized requests back to the landing page
function PrivateRoute({ component: Component, ...rest }) {
    const {auth, ...others} = {...rest};
    const currentUser = auth.currentUser;
  return (
    <Route
      {...others}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}
export default withAuth(PrivateRoute)