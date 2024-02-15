export const creatorListFormat = (creatorList) => {
  let creatorText = "";
  creatorList.forEach((creator, index) => {
    if (creatorText !== "") {
      creatorText += ", ";
    }
    creatorText += (creator.nickname ? creator.nickname : "No Name");
  })

  return (creatorText !== "" ? creatorText : "creator");
}