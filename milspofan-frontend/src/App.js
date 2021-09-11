import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import MembersPage from './pages/MembersPage.js' 
import RecommendationsPage from './pages/RecommendationsPage.js'
import SignupPage from "./pages/SignupPage.js";
import EditProfilePage from "./pages/EditProfilePage.js"
import DeleteMemberPage from "./pages/DeleteMemberPage.js"
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import MemberDetailPage from './pages/MemberDetailPage.js'
import SignupSuccessPage from './pages/SignupSuccessPage.js';
import AppNavLinks from "./components/AppNav/AppNav.js";
import { UserProvider } from './context/UserContext.js';

// import UserContext from './context/UserContext.js'
// import {tokenFunc, setCookie, getCookie, checkCookie, signUpSubmit} from './api/MembersAPI'

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <div>
              <AppNavLinks/>
              <Route exact path="/" component={HomePage} name="homepage"/>
              <Route exact path="/members" component={MembersPage} />
              <Route path="/signup" component={SignupPage} />
              <Route exact path="/recs" component={RecommendationsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path={"/members/:memberPK"} component={MemberDetailPage} />
              {/* <Route exact path={"/members/:memberPK/edit"} component={EditProfilePage} /> */}
              <Route exact path={"/editProfile"} component= {EditProfilePage} />
              <Route exact path={"/deleteAccount"} component = {DeleteMemberPage} />
              <Route exact path={"/signupSuccess"} component = {SignupSuccessPage} />
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
