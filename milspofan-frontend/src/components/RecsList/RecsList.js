// import { useState, useEffect } from 'react';
// import {fetchRecs} from './api/ReccomendationsAPI.js'



const RecsList = ({ recs, handleTitleClick }) => {
  return (

        <div>
          <ul>
            {recs.map((rec, index) => (
              <li key={`rec-${index}`}> 
                <h5>{rec.name} in {rec.location}</h5>
                <a href ={rec.website}>{rec.website}</a>
                <br/>
                <br/>
              </li>
            ))}
          </ul>
      </div>
      );
}



export default RecsList