import React from 'react'
import { useState, useEffect, useContext } from 'react';
import RecsList from '../components/RecsList/RecsList.js'
import fetchRecs from '../api/RecommendationsAPI.js'
import UserContext from "../context/UserContext"

const RecommendationsPage = ({history}) => {
  const [recs, setRecs] = useState();
  const userInfo = useContext(UserContext)
  // let token = userInfo.token

  useEffect( () => {
    
    const getRecs = async () => {
      if (userInfo.token){
        let token = userInfo.token
        let the_recs = await fetchRecs(token)
        setRecs(the_recs)
      }
      }
    
  getRecs()

  }, [])
    
    if (!recs){
      return <p>Loading...</p>
    }
    else {
      return (
        <div>
          <h1>MilspoFAN Recommendations Page</h1>
          <h2>Recommendations:</h2>
          <RecsList recs={recs}
            // handleTitleClick={(recID) => history.push(`/recs/${recID}`) } 
            />
        </div>
      );
    }    
  }



export default RecommendationsPage;