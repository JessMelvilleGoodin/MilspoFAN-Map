import React from "react";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useMemberAuth } from "../context/UserContext.js";
import { signUpSubmit } from "../api/MembersAPI.js";
import { artDiscList } from "../components/ArtDiscs/ArtDiscs.js";
import { UsernameField, PassOneField, PassTwoField, NameOnBlogField, EmailField, ArtistBioField, WebsiteField, ImageURLField, HashtagsField, PublicProfileChoice, ArtDiscBoxes} from "../components/SignInFormFields/SignInFormFields.js"

const SignupPage = () => {

  let [username, setUsername] = useState();
  let [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [nameOnBlog, setNameOnBlog ] = useState();
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
  
  // console.log("*******SUP.ADCB: ", artDiscCheckboxes, artDiscList.length)

  const { currentUserName, currentUserPK, token, getCookie, deleteCookies, loginOnSubmit } = useMemberAuth();
  // const memberContext = useContext(UserContext)

  // Form Change Handlers
  const handleChangeStandard = (e, setFieldFunc) => {
    let value = e.target.value
    // console.log("Field: ", setFieldFunc, "VALUE: ", value )
    setFieldFunc(value)
    
  }

  const handleClickSignup = async (e) => {

//  ArtDiscs doesn't work "expected dict but got a string": 
// Problems with Error list as in SignupPage
    let signUpInfo = {
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


      let x = await signUpSubmit(e, signUpInfo)
      console.log("SignUp Response: ", x)
      // console.log ("Signup Response as text: ", x.text())

      if ( x && x.status === 201 ){
        let xjson = await x.json()
        console.log("signupinfo UN & PW: ", signUpInfo.username, signUpInfo.password)
        // let new_token = await tokenFunc(userData)
        let username = signUpInfo.username
        let password = signUpInfo.password
        setSubmitted(true)
        loginOnSubmit(false, username, password)
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
      // }
    }


    if (!submitted){
      return(
        <div>
          <h6>{regErrors}</h6>


          <form method="POST" onSubmit={handleClickSignup}>
            <h5>
            <UsernameField 
            setUsername={setUsername} handleChangeStandard={handleChangeStandard}
            />
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
            setNameOnBlog={setNameOnBlog} handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <EmailField 
            setEmail={setEmail} handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <ArtistBioField 
            setArtistBio={setArtistBio} handleChangeStandard={handleChangeStandard}
            />
            </h5>
    
            <h5>
            <WebsiteField 
            setWebsite={setWebsite} handleChangeStandard={handleChangeStandard}
            />
            </h5>
            
            <h5>
              <ImageURLField 
              setImageUrl={setImageUrl} handleChangeStandard={handleChangeStandard}
              />
            </h5>
    
            <h5>
              <HashtagsField 
              setHashtags={setHashtags} handleChangeStandard={handleChangeStandard}
            />
            </h5>
            
            <PublicProfileChoice
              publicProfile = {publicProfile}
              setPublicProfile = {setPublicProfile}
            />
            
            <ArtDiscBoxes 
              artDiscList = {artDiscList}
              artDiscCheckboxes = {artDiscCheckboxes}
              setArtDiscCheckboxes = {setArtDiscCheckboxes}
              setArtisticDisciplines = {setArtisticDisciplines}
            />

            <input type="submit"/>

          </form>
        </div>
      )
    }

    else{
      // change this to Log in the user that just was created
      return <Redirect to="/signupSuccess" />  }

}
  
  export default SignupPage;