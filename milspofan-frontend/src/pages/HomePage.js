import React from 'react'
import { useState, useEffect } from 'react';
import RecsList from '../components/RecsList/RecsList.js'
import MembersList from '../components/MembersList/MembersList.js'
import fetchRecs from '../api/RecommendationsAPI.js'
import {fetchMembers, loginFunc} from '../api/MembersAPI.js'


const HomePage = ({history}) => {
  const [recs, setRecs] = useState();
  const [members, setMembers] = useState();
  
  useEffect( () => {
    const getRecs = async () => {
        let the_recs = await fetchRecs()
        setRecs(the_recs)
      }
    
    const getMembers = async () => {
      let the_members = await fetchMembers()
      setMembers(the_members)
    }

  getMembers()
  getRecs()

  }, [])
    
  if (!recs || !members){
    return <p>Loading...</p>
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