

const fetchRecs = async () => {
  try{
    let response = await fetch(`http://127.0.0.1:8000/recommendations-api/recs/`)
    let data = await response.json()
    console.log("HERE IS THE DATA>>>",data)
    return data
  } catch (error) {
    console.log(error)
  }
};

export default fetchRecs