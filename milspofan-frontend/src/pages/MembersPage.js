import React from "react";
import { useState, useContext, useEffect } from "react";
import MembersList from '../components/MembersList/MembersList.js'
// import fetchRecs from '../api/RecommendationsAPI.js'
import {fetchMembers, getCookie} from '../api/MembersAPI.js'
// import { Redirect } from "react-router-dom";
// import  { UserContext } from '../context/UserContext.js'
import { useMemberAuth } from "../context/UserContext.js";



const MembersPage = ({history}) => {
  const [members, setMembers] = useState();
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();
  // const userInfo = useContext(UserContext)
  
  useEffect( () => {
    
    const getMembers = async () => {
      console.log("getMembers RUNS")
      console.log("t,cun, cupk, ", token, currentUserName, currentUserPK)
      // let cookieToken = getCookie("token")
      // let cookieMember = getCookie("memberName")
      if (token){
        // let token = cookieToken
        let the_members = await fetchMembers(token)
        setMembers(the_members)
      }
//        Use UserContext to get token and Username inside UserInfo:
      // WILL NOT PERSIST OUTSIDE OF APP ROUTER- USE COOKIES!
      // if (userInfo.token){
      //   let token = userInfo.token
      //   let the_members = await fetchMembers(token)
      //   setMembers(the_members)
      // }
    }

  getMembers()

  }, [])
    
    if (!members){
      return <p>Please Log In To View Members</p>
    }
    else {
      

      // if logged in
      // if (document.cookie.csrftoken){
      // if (userInfo.token){
        return (
          <div>
              <h1>MilspoFAN Members: </h1>
              <MembersList members={members}
              // handleTitleClick={(memberID) => history.push(`/members/${memberID}`) } 
              />
          </div>
        );
      }
      // if not logged in 
      // else {return  <Redirect to="/login" />}
    // }    
  }



export default MembersPage;