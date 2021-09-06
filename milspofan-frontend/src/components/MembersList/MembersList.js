// import { useState, useEffect } from 'react';
// import {fetchRecs} from './api/ReccomendationsAPI.js'


const MembersList = ({ members, handleTitleClick }) => {
  return ( 
    <div>
      <h1>MEMBERS LIST</h1>
      <ul>
        {members.map((member, index) => (
          <li key={`member-${index}`}> 
            <h5>{member.username}</h5>
            {member.locations.map((loc, index) => {
              return(
              <p key={`member-loc-${index}`}>
                {loc}
              </p>
              )
            })}
            
            <br/>
            <br/>
          </li>
        ))}
      </ul>
    </div>
      );
}



export default MembersList