
import { Redirect } from "react-router-dom";


const passwordMatch = (p1, p2) => {
  if (p1 === p2){
    return true
  }
  else return window.alert("The passwords that you entered do not match. Try again.")
}

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

// Fetch Member by PK
const getMember = async(token, memberPK, setMember) => {
  let options = {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  
    },
    }
  const response = await fetch(`http://127.0.0.1:8000/members-api/members/${memberPK}`, options)
  const responseBody = await response.json()
  setMember(responseBody)
}

//  Signup Form submitted
let signUpSubmit = async (e, signUpInfo, setSubmitted) => {
  e.preventDefault()
  if (passwordMatch(signUpInfo.password, signUpInfo.password2 )){
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
        console.log("inside signUpSubmit data.status: ", data.status)
        if (response.status === 201){
          setSubmitted(true)
        }
        return data
      }
      catch(error){
        console.log("Catch: ", error)
      }
  }
}

let updateProfile = async (e, updatedInfo, setSubmitted) => {
  e.preventDefault()
  console.log("Write a call to update the info....")
  return ("We will write this tomorrow")

}


export {
  fetchMembers, 
  signUpSubmit,
  getMember,
  updateProfile
      }