import { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom'
import { getMember } from "../api/MembersAPI";
import { useMemberAuth } from "../context/UserContext.js";
import {Link} from 'react-router-dom';

const MemberDetailPage = () => {
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();
  const {memberPK} = useParams()
  const [member, setMember] = useState('')
  let artDiscStrList = ""
  if (member.artistic_disciplines) {
    console.log("Str List: ", member.artistic_disciplines.join(', '))
    artDiscStrList = member.artistic_disciplines.join(', ')
  }

  let ArtisticDisciplineList = () =>{
    if (member.artistic_disciplines.length > 1){
      return(
        <div>
          <h3>Artistic Disciplines: {artDiscStrList}</h3>
        </div>
      )
    }
    else if (member.artistic_disciplines.length === 1){
      return(
        <div>
          <h3>Artistic Discipline: {artDiscStrList}</h3>
        </div>
      )
    }
    else { return null}
  }
  
  let ownProfile = (member.username === currentUserName)

  useEffect( () => {
    getMember(token, memberPK, setMember)
  }, [])

  // const locationButtonHandler = () =>{
  //   console.log("LocationEdit Button Click")
  // }

  const editProfButtonHandler = () =>{
    console.log("Edit Profile Button Click")
  }
  
  // <EditLocationsButton/>
  // const EditLocationsButton = () => {
  //   if (ownProfile == true) {
  //     return <button onClick={locationButtonHandler}> Add or Edit Your Locations</button> 
  //   }
  //   else {return null}
  // }

  const EditProfileButton = () => {
    if (ownProfile == true) {
      return <button >
      <Link to={'/editProfile'}>Edit Your Profile</Link>
      </button> 
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
          <h3>Email: {member.email}</h3>
          <ArtisticDisciplineList/>
          <h3>Bio: {member.artist_bio}</h3>
          <h3>Website: <a href={`${member.website}`}>{member.website}</a></h3>
          <h3>Image: {member.image_url}</h3>
          <h3>Tags: {member.hashtags}</h3>
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