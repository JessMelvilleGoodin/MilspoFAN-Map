import React from 'react'
import { useState, useEffect } from 'react';
import RecsList from '../components/RecsList/RecsList.js'
import fetchRecs from '../api/RecommendationsAPI.js'


const RecommendationsPage = ({history}) => {
  const [recs, setRecs] = useState();
  
  useEffect( () => {
    const getRecs = async () => {
        let the_recs = await fetchRecs()
        setRecs(the_recs)
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