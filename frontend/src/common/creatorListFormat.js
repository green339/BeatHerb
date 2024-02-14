export const creatorListFormat = (creatorList) => {
  let creatorText = "";
  creatorList.forEach((creator, index) => {
    if (creatorText !== "") {
      creatorText += ", ";
    }
    creatorText += creator.nickname;
  })

  return (creatorText !== "" ? creatorText : "creator");
}