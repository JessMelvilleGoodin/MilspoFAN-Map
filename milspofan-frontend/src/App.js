import React, { useState } from 'react'
import { useContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import MembersPage from './pages/MembersPage.js' 
import RecommendationsPage from './pages/RecommendationsPage.js'
import SignupPage from "./pages/SignupPage.js";
import EditProfilePage from "./pages/EditProfilePage.js"
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import MemberDetailPage from './pages/MemberDetailPage.js'
import AppNavLinks from "./components/AppNav/AppNav.js";
import { UserProvider } from './context/UserContext.js';
// import UserContext from './context/UserContext.js'
// import {tokenFunc, setCookie, getCookie, checkCookie, signUpSubmit} from './api/MembersAPI'
import { Redirect } from "react-router-dom";

import './App.css';

function App() {
  // const [loggedInMemberName, setLoggedInMemberName] = useState(getCookie("memberName"))
  // const [loggedInMemberPK, setLoggedInMemberPK] = useState(getCookie("memberPK"))
  // const [token, setToken] = useState()
  // const [loggedInUser, setLoggedInUser] = useState()

    // OnClick for Login Form Button. Returns <Redirect..> if successful. 
  // const loginOnSubmit = async (e, username, password) => {
  //   e.preventDefault()
  //   let userData = {
  //     username: username,
  //     password: password
  //   };
  //   console.log("Login " + userData.username + " " + userData.password);
  //   // tokenFunc returns token OR ERROR or null
  //   let new_token = await tokenFunc(userData)
  //   if (new_token){
  //     setCookie("token", new_token.token, 15)
  //     setCookie("memberName", userData.username, 15)
  //     setCookie("memberPK", new_token.user_pk, 15)
  //     if (new_token.token){
  //       setToken(new_token.token)
  //       setLoggedInMemberName(userData.username)
  //       // setLoggedInUser(new_token.user)
  //       setLoggedInMemberPK(new_token.user_pk)
  //       return true
  //     }
  //     else { 
  //       return false}
  //   }
  //   else{
  //     return false
  //   }
    
  // }

  // let contextValue = {
  //   loggedInMemberName: loggedInMemberName, 
  //   setLoggedInMember: setLoggedInMemberName, 
  //   setLoggedInMemberPK: setLoggedInMemberPK,
  //   token: token,
  //   loginOnSubmit: loginOnSubmit,
  //   signUpSubmit: signUpSubmit,
  //   setToken: setToken,
  //   // loggedInUser: loggedInUser,
    
  //   }

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <div>
              <AppNavLinks/>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/members" component={MembersPage} />
              <Route path="/signup" component={SignupPage} />
              <Route exact path="/recs" component={RecommendationsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path={"/members/:memberPK"} component={MemberDetailPage} />
              <Route exact path={"/members/:memberPK/edit"} component={EditProfilePage} />
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
