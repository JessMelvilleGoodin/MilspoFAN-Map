import { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom'
import { getMember } from "../api/MembersAPI";
import { useMemberAuth } from "../context/UserContext.js";

const MemberDetailPage = () => {
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();
  const {memberPK} = useParams()
  const [member, setMember] = useState('')

  
  let ownProfile = (member.username === currentUserName)

  useEffect( () => {
    getMember(token, memberPK, setMember)
  }, [])

  const locationButtonHandler = () =>{
    console.log("LocationEdit Button Click")
  }

  const editProfButtonHandler = () =>{
    console.log("Edit Profile Button Click")
  }

  const EditLocationsButton = () => {
    if (ownProfile == true) {
      return <button onClick={locationButtonHandler}> Add or Edit Your Locations</button> 
    }
    else {return null}
  }
  const EditProfileButton = () => {
    if (ownProfile == true) {
      return <button onClick={editProfButtonHandler}> Edit Your Profile</button> 
    }
    else {return null}
  }
  if (!member){
    return <p>Please Log In To View Member Profiles</p>
  }
  else {
    
      return (
        <div>
          <h1>Own Profile? {ownProfile.toString()}</h1>
          <h2>{member.username}</h2>
          <h2>Name on Blog: {member.name_on_blog}</h2>
          <EditProfileButton/>
          <h3>Bio: {member.bio}</h3>
          <EditLocationsButton/>
          <h3>Location History:  {member.locations.map((loc, index) => {
              return(
              <p key={`member-loc-${index}`}>
                {loc}
              </p>
              )
            })} </h3>
        </div>
        );
      }
  
  }

export default MemberDetailPage