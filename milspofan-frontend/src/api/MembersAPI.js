
import { Redirect } from "react-router-dom";


// let usersDatabase = require('http://127.0.0.1:8000/members-api/members/')

// Fetch all the members:
const fetchMembers = async (token) => {
  let options = {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  
    },
    }
  try{
    let response = await fetch(`http://127.0.0.1:8000/members-api/members/`, options)
    let data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
};

const tokenFunc = async (userData) => {
  // Here we will make a POST request to the API endpoint get-token
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
    console.log(data.token, "loginFunc data.token")
    if (data.token){
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
  return true
}

let createMember = async () => {
  
}

let signUpSubmit = async (e, signUpInfo) => {
  e.preventDefault()
  
  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpInfo)}
    
    try{
      let response = await fetch('http://127.0.0.1:8000/members-api/signup/', options)
      console.log("SignUpInfo: ", signUpInfo)
      console.log("RESPONSE.STATUS", response.status)
      let data = await response.json()
      console.log("signUpSubmit > Try > data: ", data)
      return data
    }
    catch(error){
      console.log("Catch: ", error)
    }

}


export {
  fetchMembers, 
  tokenFunc,
  setCookie,
  getCookie,
  checkCookie,
  deleteCookies,
  signUpSubmit,
      }