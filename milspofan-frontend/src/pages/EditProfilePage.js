import React from "react";
import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMemberAuth } from "../context/UserContext.js";
import { updateProfile } from "../api/MembersAPI.js";
import { artDiscList } from "../components/ArtDiscs/ArtDiscs.js";
import { UsernameField, PassOneField, PassTwoField, NameOnBlogField, EmailField, ArtistBioField, WebsiteField, ImageURLField, HashtagsField, PublicProfileChoice, ArtDiscBoxes} from "../components/SignInFormFields/SignInFormFields.js"
import { getMember } from "../api/MembersAPI";
import MemberDetailPage from "./MemberDetailPage.js";


const EditProfilePage = () => {
  const [member, setMember] = useState('')
  
  const { currentUserName, currentUserPK, token, getCookie, deleteCookies } = useMemberAuth();

  useEffect( () => {
    getMember(token, currentUserPK, setMember)
  }, [])


  let [username, setUsername] = useState(member.username);
  let [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [nameOnBlog, setNameOnBlog ] = useState(member.name_on_blog);
  const [email, setEmail ] = useState();
  const [artistBio, setArtistBio ] = useState();
  const [website, setWebsite ] = useState();
  const [image_url, setImageUrl ] = useState();
  const [hashtags, setHashtags ] = useState();
  const [publicProfile, setPublicProfile ] = useState(false);
  const [artisticDisciplines, setArtisticDisciplines ] = useState([]);

  const [artDiscCheckboxes, setArtDiscCheckboxes] = useState(
    new Array(artDiscList.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [regErrors, setRegErrors] = useState(false)
  
  // const memberContext = useContext(UserContext)

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
                "username" : username ,
                "password" : password1 ,
                "password2" : password2 ,
                "name_on_blog" : nameOnBlog ,
                "email" : email ,
                "artist_bio" : artistBio ,
                "website" : website ,
                "image_url" : image_url ,
                "hashtags" : hashtags ,
                "public_profile" : publicProfile ,
                "artistic_disciplines" : artisticDisciplines ,
              }
// LOOK HERE TOMORROW!!
// this error section is screwed up in Sign up page, btw
      let x = await updateProfile(e, updatedInfo, setSubmitted)
      console.log("updateProfile Response: ", x)
      console.log(x.status)
      if (submitted === false) {
        let errorList = Object.keys(x).map((key) => <p key={`errors-${key}`}>
          {[key," : ", x[key]]}
        </p>)
        console.log("ELSE ERRORLIST = ", errorList)
        setRegErrors(errorList)
      }
    }


    if (!submitted){
      return(
        <div>
          <h6>{regErrors}</h6>


          <form method="POST" onSubmit={handleClickUpdate}>
            <h5> 
              {member.username}
            </h5>

            <h5>
            <PassOneField 
            setPassword1={setPassword1} handleChangeStandard={handleChangeStandard}
            />
            </h5>
            
            
            <h5>
            <PassTwoField 
            setPassword2={setPassword2} handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
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

            <input type="submit" value="Save Changes"/>

          </form>
        </div>
      )
    }

    else{
      // Working
      return <Redirect to={`/members/${currentUserPK}`} />  }

}

export default EditProfilePage