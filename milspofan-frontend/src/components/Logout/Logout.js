import React, { useState } from "react";
import {logoutFunc} from '../../api/MembersAPI'
import { Redirect } from "react-router-dom";



const Logout = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true)

  const renderLogout = (props) => {
    this.setState({ user: null })
    return (
      <Redirect to="/login" />
    )
  }

  
  let onSubmit = (e) => {
    e.preventDefault()
    console.log("LOGGING OUT- COOKIE: ", document.cookie.csrftoken)
    // cookies.remove("user")
  };
  if (document.cookie.csrftoken){
    return (
      <div>
        <h1>Do you want to Log Out?</h1>
        <form method="POST" onSubmit={(e) => onSubmit(e)}>
          <input type="submit" value="yes"/>
        </form>
      </div>
    );
  }
else {
  console.log("LOGGED IN - COOKIE:", document.cookie.csrftoken)
  return  <h2>You are already logged out.</h2>
}
    
  
}

export default Logout;
