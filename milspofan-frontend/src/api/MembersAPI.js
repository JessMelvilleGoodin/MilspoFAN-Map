
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

const getMemberReqs = async(token, memberPK, setMember, setEmail, setNameOnBlog) => {
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
  console.log(responseBody)
  setEmail(responseBody.email)
  setNameOnBlog(responseBody.name_on_blog)
}

//  Signup Form submitted
let signUpSubmit = async (e, signUpInfo ) => {
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
        console.log("RESPONSE.STATUS", response.status)
        // let data = await response.json()
        // console.log("signUpSubmit > Try > data: ", data)
        // console.log("inside signUpSubmit data.status: ", data.status)
        return response
      }
      catch(error){
        console.log("Catch: ", error)
      }
  }
  else{console.log("PASSOWORDS DON't MATCH")}
}


// ---- Called during submit of edit profile form
let updateProfile = async (e, token, memberPK, updatedInfo) => {
  e.preventDefault()
  console.log("updatedInfo inside updateProfile°******: ", updatedInfo)
  const options = {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` 
    },
    body: JSON.stringify(updatedInfo)}

    try{
      let response = await fetch(`http://127.0.0.1:8000/members-api/${memberPK}/update`, options)
      console.log("RESPONSE.STATUS", response.status)
      // let responsedata = await response.json()
      // if (response.status === 200){
      //   setSubmitted(true)
      // }
      return response
    }
    catch(error){
      console.log("Catch: ", error)
      }
}

const deleteMember = async(e, token, memberPK, setMember, deleteCookies, clearUserState, setSubmitted) => {
  console.log(`http://127.0.0.1:8000/members-api/members/${memberPK}/`)
  console.log("Event e: ", e)
  console.log("TOKEN in deleteMember: ", token)
  console.log("memberPK:", memberPK)
  console.log("setMember: ", setMember)
  console.log("deleteCookies: ", deleteCookies)
  console.log("clearUserState: ", clearUserState)
  console.log("setSubmitted: ", setSubmitted)
  let options = {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  
    },
    }
const response = await fetch(`http://127.0.0.1:8000/members-api/members/${memberPK}/`, options)
  // const responseBody = await response.json()
  // setMember(responseBody)

  if (response.status === 204 ){
    let x = await deleteCookies(e)
    console.log("x is:... ",x)
    clearUserState()
    return x
    // return (
    //   <Redirect to="/members" />
    // )
  }

}


export {
  fetchMembers, 
  signUpSubmit,
  getMember,
  updateProfile,
  getMemberReqs, 
  deleteMember
      }