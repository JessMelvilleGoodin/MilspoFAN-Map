import React, { useState } from "react";
import {getCookie, deleteCookies} from '../../api/MembersAPI'
import { Redirect } from "react-router-dom";



const Logout = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true)

  
  // let onSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("LOGGING OUT- COOKIE: ", document.cookie.csrftoken)
  //   // cookies.remove("user")
  // };


  if (submitted === false){
    if (getCookie("token")){
      return (
        <div>
          <h3>{getCookie("token")}</h3>
          <h1>Do you want to Log Out?</h1>
          <form method="POST" onSubmit={async (e) => {
            let x = await deleteCookies(e)
            console.log(x)
            setSubmitted(x)
          }}>
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
  else{
    return <Redirect to="/login" />
  }
    
  
}

export default Logout;
