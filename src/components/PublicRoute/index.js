import React from "react"
import { Route, Redirect } from "react-router-dom"
import {withAuth} from "../HOC";

// Always redirect the user to the home page if he is logged in
function PublicRoute({ component: Component, ...rest }) {
    const {auth, ...others} = {...rest};
    const currentUser = auth.currentUser;
  return (
    <Route
      {...others}
      render={props => {
        return currentUser ? <Redirect to="/home" /> : <Component {...props} />
      }}
    ></Route>
  )
}
export default withAuth(PublicRoute)