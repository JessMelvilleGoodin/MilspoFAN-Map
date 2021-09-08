const handleChangeStandard = (e, x) => {
  let value = e.target.value
  console.log("Field: ", x, "VALUE: ", value )
  x(value)
  
}


const UsernameField = (setUsername) => {
  return(
    <div>
      <label htmlFor="username-in" > Enter a Username: </label>        
      <input 
        name="username-in" 
        type="text" 
        onChange={(e) => {
          handleChangeStandard(e, setUsername)}
        } />
    </div>
  )
}

export {
  UsernameField,
}