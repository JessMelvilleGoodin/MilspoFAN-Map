import React from "react";
import { useState, useContext, useEffect } from "react";
import MembersList from '../components/MembersList/MembersList.js'
import fetchRecs from '../api/RecommendationsAPI.js'
import {fetchMembers} from '../api/MembersAPI.js'
import { Redirect } from "react-router-dom";
import UserContext from '../context/UserContext.js'


const MembersPage = ({history}) => {
  const [members, setMembers] = useState();
  const userInfo = useContext(UserContext)

  useEffect( () => {
    
    const getMembers = async () => {
      let the_members = await fetchMembers()
      setMembers(the_members)
    }

  getMembers()

  }, [])
    
    if (!members){
      return <p>Loading...</p>
    }
    else {
      

      // if logged in
      // if (document.cookie.csrftoken){
      if (userInfo.token){
        return (
          <div>
              <h2>Members: </h2>
              <MembersList members={members}
              // handleTitleClick={(memberID) => history.push(`/members/${memberID}`) } 
              />
          </div>
        );
      }
      // if not logged in 
      else {return  <Redirect to="/login" />}
    }    
  }



export default MembersPage;