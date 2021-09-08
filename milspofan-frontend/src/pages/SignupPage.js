import React from "react";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import { signUpSubmit } from "../api/MembersAPI.js";
import { artDiscList } from "../components/ArtDiscs/ArtDiscs.js";


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
  const [artisticDisciplines, setArtisticDisciplines ] = useState(null);

  const [artDiscCheckboxes, setArtDiscCheckboxes] = useState(
    new Array(artDiscList.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [regErrors, setRegErrors] = useState(false)


  // const userInfo = useContext(UserContext)

  // Form Change Handlers
  const handleChangeStandard = (e, x) => {
    let value = e.target.value
    console.log("Field: ", x, "VALUE: ", value )
    x(value)
    
  }

  const handlePublicProfileCheck = () => {
    setPublicProfile(!publicProfile);
    console.log("PubPro clicked...");
  }


  const handleArtDiscChecks = (position) => {
    console.log("ArtDisc", position)
    const updatedCheckedState = artDiscCheckboxes.map((item, index) => 
    index === position ? !item :item
    )
    
    setArtDiscCheckboxes(updatedCheckedState);
    
    const createArtDiscList = updatedCheckedState.reduce(
      function (newArr, thisBooleanValue, index){
        if (thisBooleanValue === true){
          newArr.push(artDiscList[index])
        }
        return newArr;
      }, []);

    setArtisticDisciplines(createArtDiscList)
  }


  const handleClickSignup = async (e) => {

    //  This doesn't work: 
    let signUpInfo = {
                "username" : username ,
                "password" : password1 ,
                "password2" : password2 ,
                "name_on_blog" : nameOnBlog ,
                "email" : email ,
                "artist_bio" : artistBio ,
                "website" : website ,
                // "image_url" : image_url ,
                // "hashtags" : hashtags ,
                // "public_profile" : publicProfile ,
                // "artistic_disciplines" : artisticDisciplines ,
              }

    // This works: 
    // let signUpInfo = {
    //   "username" : "ART111",
    //   "password" : ";lkjasdf",
    //   "name_on_blog":  "Post Man COPY 111",
    //   "email":  "post@man.com",
    //   "artist_bio": "jklljkjkl now" 
    //   }

      let x = await signUpSubmit(e, signUpInfo)
              console.log("SignUp Response: ", x)
              if (x.status == 200 ){
                setSubmitted(true)
              }
              else {
                let errorList = Object.keys(x).map((key) => <p>
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
          <form method="POST" onSubmit={handleClickSignup}>
            <h5>
              <label htmlFor="username-in"> Enter a Username: </label>
              <input
                name="username-in"
                type="text"
                onChange={(e) => {handleChangeStandard(e, setUsername)}} />
            </h5>

            <h5>
              <label htmlFor="password1-in" >Please enter a password:</label>        
              <input 
                name="password1-in" 
                type="password" 
                onChange={(e) => {
                    handleChangeStandard(e, setPassword1)}
                  } />
            </h5>
            
            <h5>
              <label htmlFor="password2-in" >Please enter a password:</label>        
              <input name="password2-in" type="password" onChange={(e) => {
                    handleChangeStandard(e, setPassword2)}
                  } />
            </h5>
    
            <h5>
              <label htmlFor="nameOnBlog">Name on Blog:</label>
              <input name="nameOnBlog-in" type="text" onChange={(e) => {
                    handleChangeStandard(e, setNameOnBlog)}
                  } />
            </h5>
    
            <h5>
              <label htmlFor="email">E-mail Address:</label>
              <input name="email-in" type="email" onChange={(e) => {
                    handleChangeStandard(e, setEmail)}
                  } />
            </h5>
    
            <h5>
              <label htmlFor="artistBio">Bio:</label>
              <input name="artistBio-in" type="text" onChange={(e) => {
                    handleChangeStandard(e, setArtistBio)}
                  } />
            </h5>
    
            <h5>
              <label htmlFor="website">Website:</label>
              <input name="website-in" type="text" onChange={(e) => {
                    handleChangeStandard(e, setWebsite)}
                  } />
            </h5><h5>
              <label htmlFor="image_url">Image URL:</label>
              <input name="image_url-in" type="text" onChange={(e) => {
                    handleChangeStandard(e, setImageUrl)}
                  } />
            </h5>
    
            <h5>
              <label htmlFor="hashtags">Hashtags:</label>
              <input name="hashtags-in" type="text" onChange={(e) => {
                    handleChangeStandard(e, setHashtags)}
                  } />
            </h5>
            
            
            <label htmlFor="publicProfile">Public Profile? :</label>
            <input 
              type = "checkbox" 
              name= "publicProfile-in" 
              value= "publicProfile"
              checked={publicProfile} 
              onChange={handlePublicProfileCheck} />
              <p>"Check here to allow other logged in members to view your profile"</p>
              <p>Currently set to: {publicProfile ? "checked" : "unchecked"}</p>
    
              <p>Currently set to: {publicProfile.toString()}</p> 
              
              <ul className = "artDiscList">
                {artDiscList.map((artDisc, index) => {
                  return(
                    <li key = {`artDisc-${index}`}>
    
                      <label htmlFor="`custom-checkbox-${index}`">{artDisc}</label>
                      <input 
                        type="checkbox"
                        id= {`custom-checkbox-${index}`}
                        name={artDisc} 
                        checked = {artDiscCheckboxes[index]} 
                        onChange={() => handleArtDiscChecks(index)} 
                        />
                    </li>
                  )
                })}
              </ul>
            <input type="submit"/>

          </form>
        </div>
      )
    }

    else{
      // change this to Log in the user that just was created
      return <Redirect to="/login" />  }

}
  
  export default SignupPage;