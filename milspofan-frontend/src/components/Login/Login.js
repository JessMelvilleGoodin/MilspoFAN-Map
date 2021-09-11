import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMemberAuth } from "../../context/UserContext.js";


const Login = () => {
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submitted, setSubmitted] = useState(false);


  const { loginOnSubmit } = useMemberAuth();

  let changeUserHandler = e => {
    // fix this
    setUsername(e.target.value)
  }

  let changePWHandler = e => {
    // fixthis
    setPassword(e.target.value)
  }

// What to Render based on Token context (is there a user logged in?) and Submit button (sets submitted to true to trigger re-reder of Login component)
  if (submitted === false){
    return (
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
              <label htmlFor="pw-input" >Please enter your password:</label>        
              <input name="pw-input" type="password" onChange={changePWHandler} />
              <input type="submit"/>
            </form>
          </div>
    );
  }
else {
  return <Redirect to="/members" />
}
    
  
}

export default Login;
