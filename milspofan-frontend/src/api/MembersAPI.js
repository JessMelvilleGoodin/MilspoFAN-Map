
import { Redirect } from "react-router-dom";


// let usersDatabase = require('http://127.0.0.1:8000/members-api/members/')

// Fetch all the members:
const fetchMembers = async () => {
  try{
    let response = await fetch(`http://127.0.0.1:8000/members-api/members/`)
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


export {
  fetchMembers, 
  tokenFunc
      }