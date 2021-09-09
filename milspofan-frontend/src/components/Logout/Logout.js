import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMemberAuth } from "../../context/UserContext.js";



const Logout = () => {
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies, clearUserState } = useMemberAuth();

  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true)

  if (submitted === false){
    if (token){
      return (
        <div>
          <h3>{token}</h3>
          <h1>Do you want to Log Out?</h1>
          <form method="POST" onSubmit={async (e) => {
            let x = await deleteCookies(e)
            console.log(x)
            clearUserState()
            // no cookies = false
            setSubmitted(x)
          }}>
            <input type="submit" value="yes"/>
          </form>
        </div>
      );
    }
    else {
      return  <h2>You are already logged out.</h2>
    }
    }
  else{
    return <Redirect to="/login" />
  }
    
  
}

export default Logout;
