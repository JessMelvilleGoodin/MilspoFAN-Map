import React from "react";
import { useState, useContext } from "react";
import {tokenFunc} from '../../api/MembersAPI'
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext.js";


const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] =  useState();

  const userInfo = useContext(UserContext)

  let changeUserHandler = e => {
    // fix this
    setUsername(e.target.value)
  }

  let changePWHandler = e => {
    // fixthis
    setPassword(e.target.value)
  }

// What to Render based on Token context (is there a user logged in?) and Submit button (sets submitted to true to trigger re-reder of Login component)
  // if (userInfo.username === undefined && submitted === false){
  if (submitted === false){
    return (
      <UserContext.Consumer>
        {({loggedInMember, token, loginOnSubmit}) => (
          <div>
            <h1>Login</h1>
            <form method="POST" onSubmit={async (e) => {
              let x = await loginOnSubmit(e, username, password)
              console.log(x)
              setSubmitted(x)
                }}>
              <label htmlFor="usernameinput" >Please enter your username:</label>        
              <input name="usernameinput" type="text" onChange={changeUserHandler} />
              <br/>
              <label htmlFor="pw-input" >Please enter your passwprd:</label>        
              <input name="pw-input" type="password" onChange={changePWHandler} />
              <input type="submit"/>
            </form>
          </div>
          )}
      </UserContext.Consumer>
    );
  }
else {
  return <Redirect to="/recs" />
}
    
  
}

export default Login;