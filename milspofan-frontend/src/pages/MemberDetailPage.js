import { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom'
import { getCookie, getMember } from "../api/MembersAPI";
import UserContext from "../context/UserContext";

const MemberDetailPage = () => {
  let context = useContext(UserContext)
  const {memberPK} = useParams()
  const [member, setMember] = useState('')
  let token = getCookie("token")
  
  let ownProfile = (member.username === context.loggedInMember)

  useEffect( () => {
    getMember(token, memberPK, setMember)
  }, [])

  const locationButtonHandler = () =>{
    console.log("LocationEdit Button Click")
  }

  const EditLocationsButton = () => {
    if (ownProfile == true) {
      return <button onClick={locationButtonHandler}> Add or Edit Your Locations</button> 
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