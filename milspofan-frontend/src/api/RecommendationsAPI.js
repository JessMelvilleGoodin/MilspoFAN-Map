const fetchRecs = async (token) => {
      let options = {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`  
        },
        }
      try{
        let response = await fetch(`http://127.0.0.1:8000/recommendations-api/recs/`, options)
        let data = await response.json()
        return data
      } catch (error) {
        console.log(error)
      }
}

export default fetchRecs