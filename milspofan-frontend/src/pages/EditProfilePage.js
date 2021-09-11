import React from "react";
import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMemberAuth } from "../context/UserContext.js";
import { updateProfile } from "../api/MembersAPI.js";
import { artDiscList } from "../components/ArtDiscs/ArtDiscs.js";
import { UsernameField, PassOneField, PassTwoField, NameOnBlogField, EmailField, ArtistBioField, WebsiteField, ImageURLField, HashtagsField, PublicProfileChoice, ArtDiscBoxes} from "../components/SignInFormFields/SignInFormFields.js"
import { getMember, getMemberReqs } from "../api/MembersAPI";
import MemberDetailPage from "./MemberDetailPage.js";
import {Link} from 'react-router-dom';


const EditProfilePage = () => {
  const [member, setMember] = useState('')
  
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();

  useEffect( () => {
    console.log("USE EFFECT GOES. Email: ", email)
    getMemberReqs(token, currentUserPK, setMember, setEmail, setNameOnBlog)
  }, [])


    const locationButtonHandler = () =>{
    console.log("LocationEdit Button Click")
  }


  const EditLocationsButton = () => {
  //   if (ownProfile == true) {
      return <button onClick={locationButtonHandler}> Add or Edit Your Locations</button> 
  //   }
  //   else {return null}
  }

  
  let [username, setUsername] = useState(currentUserName);
  // let [password1, setPassword1] = useState(member.password);
  // const [password2, setPassword2] = useState(member.password2);
  const [nameOnBlog, setNameOnBlog ] = useState();
  const [email, setEmail ] = useState();
  const [artistBio, setArtistBio ] = useState();
  const [website, setWebsite ] = useState();
  const [image_url, setImageUrl ] = useState();
  const [hashtags, setHashtags ] = useState();
  const [publicProfile, setPublicProfile ] = useState(false);
  const [artisticDisciplines, setArtisticDisciplines ] = useState([]);
  
  // array of booleans
  const [artDiscCheckboxes, setArtDiscCheckboxes] = useState(
    new Array(artDiscList.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [regErrors, setRegErrors] = useState(false)
    
    // Form Change Handlers
    const handleChangeStandard = (e, setFieldFunc) => {
      let value = e.target.value
    console.log("Field: ", setFieldFunc, "VALUE: ", value )
    setFieldFunc(value)
    
  }

  const handleClickUpdate = async (e) => {

    //  ArtDiscs doesn't work "expected dict but got a string": 
    // Problems with Error list as in SignupPage
    let updatedInfo = {
                "username" : member.username ,
                "name_on_blog" : nameOnBlog ,
                "email" : email ,
                "artist_bio" : artistBio ,
                "website" : website ,
                "image_url" : image_url ,
                "hashtags" : hashtags ,
                "public_profile" : publicProfile ,
                "artistic_disciplines" : artisticDisciplines ,
              }

// this error section is screwed up in Sign up page, btw
    let x = await updateProfile(e, token, currentUserPK, updatedInfo)
    console.log("updateProfile Response: ", x, "TOKEN: ", token)
    console.log(x.status)
    if ( x && x.status === 200 ){
        let xjson = await x.json()
        setSubmitted(true)
      }
      else if (x) {
        let xjson = await x.json()
        let errorList = Object.keys(xjson).map((key) => <p key={`errors-${key}`}>
          {[key," : ", xjson[key]]}
        </p>)
        console.log("ELSE ERRORLIST = ", errorList)
        setRegErrors(errorList)

      }
      
      else {
        console.log("ELSE NO X")
      }
    // if (submitted === false) {
    //   // console.log("Submit = false so Errors go here. ")
    //   // let errorList = Object.keys(x).map((key) => <p key={`errors-${key}`}>
    //   //   {[key," : ", x[key]]}
    //   // </p>)
    //   // console.log("ELSE ERRORLIST = ", errorList)
    //   // setRegErrors(errorList)
    // }
  }

    if (!submitted){
      return(
        <div>
          <h4>Submitted = {submitted.toString()}</h4>
          <h6>{regErrors}</h6>


          <form method="POST" 
          onSubmit={handleClickUpdate}>
            <h5> 
              {member.username}
            </h5>

            <button><Link to={'/deleteAccount'}>Delete my Account</Link></button>
            <h5>
            <NameOnBlogField 
            setNameOnBlog={setNameOnBlog} 
            value = {member.name_on_blog}
            handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <EmailField 
            value = {member.email}
            setEmail={setEmail} 
            handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <ArtistBioField 
            setArtistBio={setArtistBio}
            value = {member.artist_bio} 
            handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <WebsiteField 
            setWebsite={setWebsite} 
            value = {member.website}
            handleChangeStandard={handleChangeStandard}
            />
            </h5>
            
            <h5>
              <ImageURLField 
              setImageUrl={setImageUrl} 
              value = {member.image_url}
              handleChangeStandard={handleChangeStandard}
              />
            </h5>
    
            <h5>
              <HashtagsField 
              setHashtags={setHashtags} 
              value = {member.hashtags}
              handleChangeStandard={handleChangeStandard}
            />
            </h5>
            
            <PublicProfileChoice
              publicProfile = {publicProfile}
              value = {member.public_profile}
              setPublicProfile = {setPublicProfile}
            />
            
            <ArtDiscBoxes 
              artDiscList = {artDiscList}
              artDiscCheckboxes = {artDiscCheckboxes}
              setArtDiscCheckboxes = {setArtDiscCheckboxes}
              setArtisticDisciplines = {setArtisticDisciplines}
            />
            <EditLocationsButton/>
            <br/>
            <input type="submit" value="Save Changes"/>

          </form>
        </div>
      )
    }

    else {
      // Working
      return <Redirect to={`/members/${currentUserPK}`} />  }

}

export default EditProfilePage