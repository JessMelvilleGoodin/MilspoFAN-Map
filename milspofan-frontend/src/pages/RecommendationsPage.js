import React from 'react'
import { useState, useEffect, useContext } from 'react';
import RecsList from '../components/RecsList/RecsList.js'
import fetchRecs from '../api/RecommendationsAPI.js'
import { useMemberAuth } from "../context/UserContext.js";


const RecommendationsPage = ({history}) => {
  const [recs, setRecs] = useState();
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();


  useEffect( () => {
    
    const getRecs = async () => {
      // let cookieToken = getCookie("token")
      // let cookieMember = getCookie("memberName")
      // console.log("USING COOKIES: Cookie Token & Name: ", cookieToken, cookieMember)
      if (token){
        // let token = cookieToken
        let the_recs = await fetchRecs(token)
        setRecs(the_recs)
      }
      // Use UserContext to get token and Username inside UserInfo:
      // WILL NOT PERSIST OUTSIDE OF APP ROUTER- USE COOKIES!
      // if (userInfo.token){
      //   let token = userInfo.token
      //   let the_recs = await fetchRecs(token)
      //   setRecs(the_recs)
      // }
      }
    
  getRecs()

  }, [])
    
    if (!recs){
      return <p>Please Log In to View Recommendations</p>
    }
    else {
      return (
        <div>
          <h1>MilspoFAN Recommendations:</h1>
          <RecsList recs={recs}
            // handleTitleClick={(recID) => history.push(`/recs/${recID}`) } 
            />
        </div>
      );
    }    
  }



export default RecommendationsPage;