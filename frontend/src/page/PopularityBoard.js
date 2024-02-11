// 인기 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsRanking from "../components/ContentsRanking";
import { useState, useEffect } from "react";
import axios from "axios";

const periodList = ["daily", "weekly", "monthly"];

export default function PopularityBoard() {
  const [dailyMelodyList, setDailyMelodyList] = useState([]);
  const [weeklyMelodyList, setWeklyMelodyList] = useState([]);
  const [monthlyMelodyList, SetMonthlyMelodyList] = useState([]);
  const [dailyVocalList, setDailyVocalList] = useState([]);
  const [weeklyVocalList, setWeklyVocalList] = useState([]);
  const [monthlyVocalList, SetMonthlyVocalList] = useState([]);
  const [dailyMusicList, setDailyMusicList] = useState([]);
  const [weeklyMMusicList, setWeklyMusicList] = useState([]);
  const [monthlyMusicList, SetMonthlyMusicList] = useState([]);

  const serverURL = process.env.REACT_APP_TEST_SERVER_BASE_URL + "/content";

  useEffect(() => {
    const endPoint = [
      "/daily/melody", "/weekly/melody", "/monthly/melody",
      "/daily/vocal", "/weekly/vocal", "/monthly/vocal",
      "/daily/soundtrack", "/weekly/soundtrack", "/monthly/soundtrack",
    ]
    const stateSetter = [
      setDailyMelodyList, setWeklyMelodyList, SetMonthlyMelodyList,
      setDailyVocalList, setWeklyVocalList, SetMonthlyVocalList,
      setDailyMusicList, setWeklyMusicList, SetMonthlyMusicList
    ]

    Array(9).fill().map((v,i)=>i).map((value) => {
      axios({
        method: "get",
        url: `${serverURL}${endPoint[value]}`
      })
      .then((response) => {
        console.log(response.data);
        stateSetter[value](response.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
    })
  }, [])

  return (
    <>
      <ItemContainerWithTitle title="멜로디" link="/board/contents" data={{ category: "melody", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking
              key={"melody " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "melody", sortOption: "popularity" }} 
            />
          ))
        }
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="보컬" link="/board/contents" data={{ category: "vocal", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking 
              key={"vocal " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "vocal", sortOption: "popularity" }} 
            />
          ))
        } 
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="음원" link="/board/contents" data={{ category: "music", sortOption: "popularity" }} >
        {
          periodList.map((period) => (
            <ContentsRanking 
              key={"music " + period}
              title={period} 
              link="/board/contents" 
              data={{ category: "music", sortOption: "popularity" }} 
            />
          ))
        } 
      </ItemContainerWithTitle>
    </>
  );
}