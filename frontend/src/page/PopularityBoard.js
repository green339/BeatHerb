// 인기 게시판 페이지 항목

import ItemContainerWithTitle from "../components/ItemContainerWithTitle";
import ContentsRanking from "../components/ContentsRanking";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PopularityBoard() {
  const [dailyMelodyList, setDailyMelodyList] = useState([]);
  const [weeklyMelodyList, setWeklyMelodyList] = useState([]);
  const [monthlyMelodyList, setMonthlyMelodyList] = useState([]);
  const [dailyVocalList, setDailyVocalList] = useState([]);
  const [weeklyVocalList, setWeklyVocalList] = useState([]);
  const [monthlyVocalList, setMonthlyVocalList] = useState([]);
  const [dailyMusicList, setDailyMusicList] = useState([]);
  const [weeklyMusicList, setWeklyMusicList] = useState([]);
  const [monthlyMusicList, setMonthlyMusicList] = useState([]);

  useEffect(() => {
    const serverURL = process.env.REACT_APP_TEST_SERVER_BASE_URL;
    
    axios({
      method: "get",
      url: `${serverURL}/content/popularity`
    })
    .then((response) => {
      const data = response.data.data;
      setDailyMelodyList(data.dailyMelody);
      setWeklyMelodyList(data.weeklyMelody);
      setMonthlyMelodyList(data.monthlyMelody);
      setDailyVocalList(data.dailyVocal);
      setWeklyVocalList(data.weeklyVocal);
      setMonthlyVocalList(data.monthlyVocal);
      setDailyMusicList(data.dailySoundtrack);
      setWeklyMusicList(data.weeklySoundtrack);
      setMonthlyMusicList(data.monthlySoundtrack);
    })
    .catch((error) => {
      alert(error.response.data.message);
    })
  }, []);

  return (
    <>
      <ItemContainerWithTitle title="멜로디" link="/board/contents" data={{ category: "melody" }} >
        <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={dailyMelodyList.slice(0, 5)}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={weeklyMelodyList.slice(0, 5)}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "melody", sortOption: "popularity" }}
          contentList={monthlyMelodyList.slice(0, 5)}
        />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="보컬" link="/board/contents" data={{ category: "vocal" }} >
      <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={dailyVocalList.slice(0, 5)}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={weeklyVocalList.slice(0, 5)}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "vocal", sortOption: "popularity" }}
          contentList={monthlyVocalList.slice(0, 5)}
        />
      </ItemContainerWithTitle>
      <ItemContainerWithTitle title="음원" link="/board/contents" data={{ category: "music" }} >
      <ContentsRanking
          title="daily" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={dailyMusicList.slice(0, 5)}
        />
        <ContentsRanking
          title="weekly" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={weeklyMusicList.slice(0, 5)}
        />
        <ContentsRanking
          title="monthly" 
          link="/board/contents" 
          data={{ category: "music", sortOption: "popularity" }}
          contentList={monthlyMusicList.slice(0, 5)}
        />
      </ItemContainerWithTitle>
    </>
  );
}