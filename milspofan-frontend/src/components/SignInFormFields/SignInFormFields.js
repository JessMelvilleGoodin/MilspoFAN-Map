// const handleChangeStandard = (e, x) => {
//   let value = e.target.value
//   console.log("Field: ", x, "VALUE: ", value )
//   x(value)
  
// }


const UsernameField = (props) => {
  return(
    <div>
      <label htmlFor="username-in" > Enter a Username: </label>        
      <input 
        name="username-in" 
        value={props.value}
        type="text" 
        onChange={(e) => {
          props.handleChangeStandard(e, props.setUsername)}
        } />
    </div>
  )
}

const PassOneField = (props) => {
  return(
    <div>
      <label htmlFor="password1-in" > Please enter a password:</label>        
                  <input 
                    name="password1-in" 
                    type="password" 
                    value={props.value}
                    onChange={(e) => {
                        props.handleChangeStandard(e, props.setPassword1)}
                      } />
    </div>
  )
}

const PassTwoField = (props) => {
  return(
    <div>
      <label htmlFor="password2-in" >Please enter a password:</label>        
              <input 
              name="password2-in" 
              type="password" 
              value={props.value}
              onChange={(e) => {
                    props.handleChangeStandard(e, props.setPassword2)}
                  } />
    </div>
  )
}

const NameOnBlogField = (props) =>{
  return(
    <div>
      <label htmlFor="nameOnBlog">Name on Blog:</label>
              <input 
              name="nameOnBlog-in" 
              type="text"
              defaultValue={props.value} 
              onChange={(e) => {
                    props.handleChangeStandard(e, props.setNameOnBlog)}
                  } />
    </div>
  )
}

const EmailField = (props) => {
  return (
    <div>
      <label htmlFor="email">E-mail Address:</label>
              <input 
              name="email-in" 
              type="email" 
              defaultValue={props.value} 
              onChange={(e) => {
                    props.handleChangeStandard(e, props.setEmail)}
                  } />
    </div>
  )
}

const ArtistBioField = (props) => {
  return (
    <div>
      <label htmlFor="artistBio">Bio:</label>
      <input 
      name="artistBio-in" 
      type="text" 
      defaultValue={props.value}
      onChange={(e) => {
                    props.handleChangeStandard(e, props.setArtistBio)}
                  } 
      />
    </div>
  )
}

const WebsiteField = (props) => {
  return (
    <div>
      <label htmlFor="website">Website: (Website URL must include "https://www.")</label>

      <input 
        name="website-in" 
        type="text"
        defaultValue={props.value} 
        onChange={(e) => {
              props.handleChangeStandard(e, props.setWebsite)}
            } />
    </div>
  )
}

const ImageURLField = (props) => {
  return (
    <div>
      <label htmlFor="image_url">Image URL:</label>
              <input 
              name="image_url-in" 
              type="text" 
              defaultValue={props.value}
              onChange={(e) => {
                    props.handleChangeStandard(e, props.setImageUrl)}
                  } />
    </div>
  )
}

const HashtagsField = (props) => {
  return (
    <div>
      <label htmlFor="hashtags">Hashtags:</label>
              <input 
              name="hashtags-in" 
              type="text" 
              defaultValue={props.value}
              onChange={(e) => {
                    props.handleChangeStandard(e, props.setHashtags)}
                  } />
    </div>
  )
}


const PublicProfileChoice = (props) => {
  return(
    <div>
      <h5><label htmlFor="publicProfile">Public Profile? :</label></h5>
      <p>Check the box to allow other logged in members to view your profile</p>
      <input 
        type = "checkbox" 
        name= "publicProfile-in" 
        // value= "publicProfile"
        // value= {false}
        checked={props.publicProfile} 
        defaultValue={props.value}
        onChange={ (e) =>{
          props.setPublicProfile(!props.publicProfile)
        }
          // console.log("PUB PROFILE Change")
          // props.setPublicProfile(true)
        //   props.setPublicProfile(!props.publicProfile)
        }
        />
    </div>
  )
}

const handleArtDiscChecks = (position, artDiscCheckboxes, setArtDiscCheckboxes, artDiscList, setArtisticDisciplines) => {
  // console.log("[[[[", artDiscCheckboxes.toString())
  // console.log(";;;", artDiscCheckboxes)
  // console.log("ArtDisc", position)
  const updatedCheckedState = artDiscCheckboxes.map((item, index) => 
  index === position ? !item : item
  )
  
  
  setArtDiscCheckboxes(updatedCheckedState);
  
  // creates an array of strings - names of art.disc's
  const createArtDiscList = updatedCheckedState.reduce(
    function (newArr, thisBooleanValue, index){
      if (thisBooleanValue === true){
        newArr.push(artDiscList[index])
      }
      // console.log("INSIDE createArtDiscList: ", newArr)
      return newArr;
    }, []);

  setArtisticDisciplines(createArtDiscList)
}

// Array of boolean values
const ArtDiscBoxes = (props) => {
  
  return (
    <div>
      <h5> Artistic Discipline(s):</h5>
      <ul className = "artDiscList">
        {props.artDiscList.map((artDisc, index) => {
          return(
            <li key = {`artDisc-${index}`}>

              <label htmlFor={`custom-checkbox-${index}`}>{artDisc}</label>
              <input 
                type="checkbox"
                id= {`custom-checkbox-${index}`}
                name={artDisc} 
                checked = {props.artDiscCheckboxes[index]} 
                onChange={() => handleArtDiscChecks(index, props.artDiscCheckboxes, props.setArtDiscCheckboxes, props.artDiscList, props.setArtisticDisciplines)} 
                />
            </li>
          )
        })}
              </ul>
    </div>
  )
}

export {
  UsernameField,
  PassOneField,
  PassTwoField,
  NameOnBlogField,
  EmailField,
  ArtistBioField,
  WebsiteField,
  ImageURLField,
  HashtagsField,
  PublicProfileChoice,
  ArtDiscBoxes
}