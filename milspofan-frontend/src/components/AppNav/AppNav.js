import React from 'react';
import {Link} from 'react-router-dom'


const AppNavLinks = () => {
  return (
    <div>
      <Link to={`/`} > Home </Link>
      <Link to={`/recs`} > Recommendations List </Link>
      <Link to={`/members`} > Members List </Link>
      <Link to={`/signup`} > Register </Link>
      <Link to={`/login`} > Login </Link>
      <Link to={`/logout`} > Logout </Link>
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
