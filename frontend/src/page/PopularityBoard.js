// 인기 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsRanking from "../components/ContentsRanking";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PopularityBoard() {
  const [dailyMelodyList, setDailyMelodyList] = useState([]);
  const [weeklyMelodyList, setWeklyMelodyList] = useState([]);
  const [monthlyMelodyList, SetMonthlyMelodyList] = useState([]);
  const [dailyVocalList, setDailyVocalList] = useState([]);
  const [weeklyVocalList, setWeklyVocalList] = useState([]);
  const [monthlyVocalList, SetMonthlyVocalList] = useState([]);
  const [dailyMusicList, setDailyMusicList] = useState([]);
  const [weeklyMusicList, setWeklyMusicList] = useState([]);
  const [monthlyMusicList, SetMonthlyMusicList] = useState([]);

  useEffect(() => {
    const serverURL = process.env.REACT_APP_TEST_SERVER_BASE_URL + "/content";

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

    Array(9).fill().map((v,i)=>i).forEach((value) => {
      axios({
        method: "get",
        url: `${serverURL}${endPoint[value]}`
      })
      .then((response) => {
        console.log(response.data);
        stateSetter[value](response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
    })
  }, [])

  return (
    <>
      <ItemContainerWithTitle title="멜로디" link="/board/contents" data={{ category: "melody", sortOption: "popularity" }} >
        <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={dailyMelodyList}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={weeklyMelodyList}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={monthlyMelodyList}
        />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="보컬" link="/board/contents" data={{ category: "vocal", sortOption: "popularity" }} >
      <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={dailyVocalList}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={weeklyVocalList}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={monthlyVocalList}
        />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="음원" link="/board/contents" data={{ category: "music", sortOption: "popularity" }} >
      <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={dailyMusicList}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={weeklyMusicList}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={monthlyMusicList}
        />
      </ItemContainerWithTitle>
    </>
  );
}