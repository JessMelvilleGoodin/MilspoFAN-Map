import React from 'react'
import { useState, useEffect } from 'react';
import RecsList from '../components/RecsList/RecsList.js'
import MembersList from '../components/MembersList/MembersList.js'
import fetchRecs from '../api/RecommendationsAPI.js'
import { fetchMembers } from '../api/MembersAPI.js'
import { useMemberAuth } from "../context/UserContext.js";


const HomePage = ({history}) => {
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();

  const [recs, setRecs] = useState();
  const [members, setMembers] = useState();
  
  useEffect( () => {
  
    const getRecs = async () => {
        let the_recs = await fetchRecs(token)
        setRecs(the_recs)
      }
    
    const getMembers = async () => {
      let the_members = await fetchMembers(token)
      setMembers(the_members)
    }
    if (getCookie("token")){
      getMembers()
      getRecs()
    }

  }, [])
    
  if (!recs || !members){
    return <p>Please Log in</p>
  }
  else {
    return (
      <div>
        <h1>MilspoFAN Home Page</h1>

        <h2>Recommendations:</h2>
        <RecsList recs={recs}
          // handleTitleClick={(recID) => history.push(`/recs/${recID}`) } 
          />
          <h2>Members: </h2>
          <MembersList members={members}
          // handleTitleClick={(memberID) => history.push(`/members/${memberID}`) } 
          />
      </div>
    );
  }    
}



export default HomePage;