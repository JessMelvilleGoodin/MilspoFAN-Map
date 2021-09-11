import React from 'react';
import {Link} from 'react-router-dom';

import { useMemberAuth } from "../context/UserContext.js";

let SignupSuccessPage = () => {
  const { currentUserName, currentUserPK, token, deleteCookies, clearUserState } = useMemberAuth();
  return(
    <div>
      <h2>Your Signup was successful.</h2>
        <h2>Welcome, {currentUserName}</h2>
        <button><Link to={`/members/${currentUserPK}`}>View Your Profile </Link></button>
        <button><Link to={`/recs`} > Recommendations List </Link></button>
        <button><Link to={`/members`} > Members List </Link></button>
    </div>
  )
}

export default SignupSuccessPage 