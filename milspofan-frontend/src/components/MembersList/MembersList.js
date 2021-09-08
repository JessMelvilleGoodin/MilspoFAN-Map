// import { useState, useEffect } from 'react';
// import {fetchRecs} from './api/ReccomendationsAPI.js'
import {Link} from 'react-router-dom'


const MembersList = ({ members, handleTitleClick }) => {
  return ( 
    <div>
      <h1>MEMBERS LIST</h1>
      <ul>
        {members.map((member, index) => (
          <li key={`member-${index}`}> 
            <h5>{member.username}: {member.name_on_blog}</h5>
            <Link to={`/members/${member.pk}`}>View {member.username}'s Profile</Link>
            {/* <button value="View this profile" onClick=''/> */}
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