import React from "react";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext.js";

const SignupPage = () => {
  const artDiscList = [
    "Dance",
    "Theatre",
    "Painting",
    "Visual Art",
    "Poetry",
    "Createive Writing",
  ]
  // State
  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [nameOnBlog, setNameOnBlog ] = useState();
  const [email, setEmail ] = useState();
  const [artistBio, setArtistBio ] = useState();
  const [website, setWebsite ] = useState();
  const [image_url, setImageUrl ] = useState();
  const [hashtags, setHashtags ] = useState();
  const [publicProfile, setPublicProfile ] = useState(false);
  const [artisticDisciplines, setArtisticDisciplines ] = useState();
  const [artDiscCheckboxes, setArtDiscCheckboxes] = useState(
    new Array(artDiscList.length).fill(false));
  const [submitted, setSubmitted] = useState(false);


  const userInfo = useContext(UserContext)

  // Form Change Handlers
  const placeHolder = (e) => {
    console.log(e.target.value);
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

  const signUpSubmit = () => {
    console.log("SUBMIT BUTTON CLICKED")
  }


  return(
    <div>
      <form method="POST" onSubmit={async (e) => {
        let x = await signUpSubmit(e, username, password1, password2, nameOnBlog, email, artistBio, website, image_url, hashtags, publicProfile, artisticDisciplines)
        console.log(x)
        setSubmitted(x)
          }}>

        <label htmlFor="username-in" >Enter a Username:</label>        
        <input name="username-in" type="text" onChange={placeHolder} />

        <label htmlFor="password1-in" >Please enter a password:</label>        
        <input name="password1-in" type="password" onChange={placeHolder} />
        <input type="submit"/>


        <label htmlFor="password2-in" >Please enter a password:</label>        
        <input name="password2-in" type="password" onChange={placeHolder} />


        <label htmlFor="nameOnBlog">Name on Blog:</label>
        <input name="nameOnBlog-in" type="text" onChange={placeHolder} />


        <label htmlFor="email">E-mail Address:</label>
        <input name="email-in" type="email" onChange={placeHolder} />


        <label htmlFor="artistBio">Bio:</label>
        <input name="artistBio-in" type="text" onChange={placeHolder} />


        <label htmlFor="website">Website:</label>
        <input name="website-in" type="text" onChange={placeHolder} />

        <label htmlFor="image_url">Image URL:</label>
        <input name="image_url-in" type="text" onChange={placeHolder} />


        <label htmlFor="hashtags">Hashtags:</label>
        <input name="hashtags-in" type="text" onChange={placeHolder} />

        <label htmlFor="publicProfile">Public Profile? :</label>
        <input 
          type = "checkbox" 
          name="publicProfile-in" 
          value="publicProfile"
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
                    type = "checkbox"  
                    onChange={() => handleArtDiscChecks(index)} 
                    />
                </li>
              )
            })}
          </ul>
        <br/>
        <input type="submit"/>
      </form>
    </div>
  )

}

export default SignupPage;