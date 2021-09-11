const artDiscList = [
  "Visual Art",
  "Performing Art",
  "Creative Writing",
  "Multi-Disciplinary Art",
  "Dance",
  "Theatre",
  "Music",
  "Painting",
  "Collage",
  "Fiber Art",
  "Poetry",
  "Multimedia",
  "Digital Art",
  "Photography",
]

const getArtDiscPositionsFromMemberArray = (member) => {
  let memberADs = member.artistic_disciplines
  let memberboolArray = []
  console.log("MemberADs: ", memberADs)
  // make a new array of boolean vlaues for each AD Name in the ADList
  let memberBoolBoxes = artDiscList.map((ADName, index) => {
  //   // Does the ADList item match any items in the memberAD list?
      // console.log("#: ", ADName, memberADs)
      if (memberADs.includes(ADName)){
        // console.log("Hot Dog!", ADName, index)
        memberboolArray.push(true)
        // console.log(memberboolArray)
      }
      else {
        memberboolArray.push(false)
      }
  }
  
  )

  return (
    memberboolArray
  )
}

export {
  artDiscList,
  getArtDiscPositionsFromMemberArray
}