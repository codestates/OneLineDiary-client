import React from "react";
import SingleDiary from "./SingleDiary";
import "../styles/DiaryList.scss";

// props로 받아올 것: accessToken, 일기 목록

const DiaryList = () => {
  return (
    <div className="DiaryList">
      {/* {diaries.map(diary => {
        return <SingleDiary diary={diary} key={diary.id} />;
      })} */}
    </div>
  );
};

export default DiaryList;
