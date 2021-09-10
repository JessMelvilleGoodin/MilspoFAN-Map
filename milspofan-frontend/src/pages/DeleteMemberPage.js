import { useState, useEffect } from "react";
import { deleteMember, getMember } from "../api/MembersAPI";
import { useMemberAuth } from "../context/UserContext.js";





const DeleteMemberPage = () =>{

  const { currentUserName, currentUserPK, token, deleteCookies, 
    clearUserState } = useMemberAuth();
  console.log("TOKEN::", token)
  const memberPK = currentUserPK
  const [member, setMember] = useState('')
  const [submitted, setSubmitted] = useState(false)
  // let ownProfile = (member.username === currentUserName)

  const DeleteButton = () => {

    // console.log("TOKEN in deleteMember: ", token)
    // console.log("memberPK:", memberPK)
    // console.log("setMember: ", setMember)
    // console.log("deleteCookies: ", deleteCookies)
    // console.log("clearUserState: ", clearUserState)
    // console.log("setSubmitted: ", setSubmitted)

    if(submitted === false){
      if(currentUserPK){
        return(
          <div>
            <h3> Permenently Delete Your Account... forever? </h3>
            <button onClick={(e) => 
              {
                
                setSubmitted(deleteMember(e, token, currentUserPK, setMember, deleteCookies, clearUserState, setSubmitted))

              }
              }> 
            Delete My Account
            </button> 
          </div>
        )
      }
      else {
        return(
          <h3>You are not logged In. Log in to delete your account</h3>
        )
      }

    }
    else {
      return (
      <div>
            <h2> Your account has been deleted </h2>
      </div>
      )
    }
  }


  let CurrentProfile = () => {
    if(currentUserName){
      return (
        <h1>Current Profile: {currentUserName} </h1>
      )
    }
    else{
      return(
        <h1> Current Profile: None </h1>
      )
    }
  }


  useEffect( () => {
    if (token){
      getMember(token, memberPK, setMember)
    }
  }, [])
  

  return (
    <div>
      <CurrentProfile />
      <h2>{currentUserPK}</h2>
      <DeleteButton />


  </div>
  )


}

export default DeleteMemberPage;