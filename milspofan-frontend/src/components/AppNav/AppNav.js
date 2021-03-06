import React from 'react';
import {Link} from 'react-router-dom';
import { useMemberAuth } from "../../context/UserContext.js";

const AppNavLinks = () => {
  const { token, currentUserPK, currentUserName } = useMemberAuth();

  let EditProfileLink = () => {
    if (token){
      return(
        <div>
          <Link to={`/members/${currentUserPK}`}>Signed in as: {currentUserName}   |   </Link>

          <Link to={`/editProfile`}>Edit Your Profile</Link>
        </div>
      )
    }
    else {
      return null
    }
  }

  return (
    <div>
      <Link to={`/`} > Home </Link>
      <Link to={`/recs`} > Recommendations List </Link>
      <Link to={`/members`} > Members List </Link>
      <Link to={`/signup`} > Register </Link>
      <Link to={`/login`} > Login </Link>
      <Link to={`/logout`} > Logout </Link>
      <EditProfileLink />
    </div>
  )
}

export default AppNavLinks


// Functional solution:
// function AppNav({ navItems, handleNavClick }) {
//   return (
//     <Navbar color="light">
//       {navItems.map((navItem) =>
//         <a href="#" onClick={() => handleNavClick( navItem.value )} >
//           { navItem.label } |
//         </a>
//       )}
//     </Navbar>
//   );
// }
