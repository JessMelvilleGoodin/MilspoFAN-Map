import { createContext, useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';

const UserContext = createContext();

const useMemberAuth = () => {
  return useContext(UserContext)
}
// -----


// -----

const UserProvider = ( {children }) => {
  // The provider feeds the rest of the App:
    // COOKIE STUFF : setting, getting, and deleting cookies
    // Login/logout functions
    // CurrentUser Info
  const [loggedInMemberName, setLoggedInMemberName] = useState(getCookie("memberName"))
  const [loggedInMemberPK, setLoggedInMemberPK] = useState(getCookie("memberPK"))
  const [token, setToken] = useState(getCookie("token"))
  
  
  // functions: token func, loginONSubmit, 

  const tokenFunc = async (userData) => {
    // Here we will make a POST request to the API endpoint "get-token/"
    // The POST request includes userData, which is an object holding username and password from the login form. 
    // options is assigned all the things needed to go "into" the API hit/call (method, headers, and body)
    // User credential validation happens on the API at get-token automatically
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)}
      
    try{ 
      let response = await fetch('http://127.0.0.1:8000/members-api/get-token', options)
      let data = await response.json()
      if (data.token){
        // console.log("USERPK: ", user)
        console.log(data)
        return data
      }
      else {
        window.alert("Invalid Credentials. Please try again")
        return false
      }
  
      
    } catch (error) {
      console.log("TOKEN ERROR: ", error)
      return  <Redirect to="/login" />
    }
  }


  // loginOnSubmit calls for a token, sets userInfo in Cookies
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
      setCookie("memberPK", new_token.user_pk, 15)
      if (new_token.token){
        // setToken(new_token.token)
        // setLoggedInMemberName(userData.username)
        // setLoggedInMemberPK(new_token.user_pk)
        return true
      }
      else { 
        return false}
    }
    else{
      return false
    }
    
  }

  // COOKIE FUNCTIONS

  // Cookie functions from: https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

let deleteCookies = async(e) => {
  e.preventDefault()
  document.cookie = "memberName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "memberPK=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  let cookiesExist = null
  if (getCookie("memberName") || getCookie("token") || getCookie("csrftoken") || getCookie("memberPK")){
    cookiesExist = true
  }
  else {cookiesExist = false}
  return !cookiesExist
}

const clearUserState = () => {
  setLoggedInMemberName(null)
  setLoggedInMemberPK(null)
  setToken(null)
  }

  
  let contextValue = {
    currentUserName : getCookie("memberName"),
    currentUserPK : getCookie("memberPK"),
    token : getCookie("token"),
    loginOnSubmit: loginOnSubmit,
    deleteCookies : deleteCookies,
    getCookie : getCookie,
    clearUserState : clearUserState,  
  }

  useEffect(() => {
  
      // setLoggedInMemberName(getCookie("memberName"))
      // setLoggedInMemberPK
      // setToken
  
  
  }, []);

return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )


}


// ---------
export {
  useMemberAuth,
  UserProvider,
  UserContext,
} 
