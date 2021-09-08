import React, { useState } from 'react'
import { useContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import MembersPage from './pages/MembersPage.js' 
import RecommendationsPage from './pages/RecommendationsPage.js'
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import UserContext from './context/UserContext.js'
import {tokenFunc, setCookie, getCookie, checkCookie, signUpSubmit} from './api/MembersAPI'
import { Redirect } from "react-router-dom";
import AppNavLinks from "./components/AppNav/AppNav.js";

import './App.css';

function App() {
  const [loggedInMember, setLoggedInMember] = useState()
  const [token, setToken] = useState()

    // OnClick for Login Form Button. Returns <Redirect..> if successful. 
  const loginOnSubmit = async (e, username, password) => {
    e.preventDefault()
    let userData = {
      username: username,
      password: password
    };
    console.log("Login " + userData.username + " " + userData.password);
    // tokenFunc returns token OR ERROR or null
    let new_token = await tokenFunc(userData)
    if (new_token){

      setCookie("token", new_token.token, 15)
      setCookie("memberName", userData.username, 15)
      if (new_token.token){
        setToken(new_token.token)
        setLoggedInMember(userData.username)
        return true
      }
      else { 
        console.log(new_token)  
        return false}
    }
    else{
      return false
    }
    
    console.log(token, loggedInMember)
  }

  const buildAuthHeader = () =>{


  }

  let contextValue = {
    loggedInMember: loggedInMember,  
    token: token,
    loginOnSubmit: loginOnSubmit,
    signUpSubmit: signUpSubmit,
    }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={contextValue}>
          <div>
              <AppNavLinks/>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/members" component={MembersPage} />
              <Route path="/signup" component={SignupPage} />
              <Route exact path="/recs" component={RecommendationsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
