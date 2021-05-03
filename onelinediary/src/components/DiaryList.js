import React from "react";
import SingleDiary from "./SingleDiary";
import axios from "axios";
import "../styles/DiaryList.scss";

// props로 받아올 것: accessToken, diaries

const DiaryList = ({ accessToken, diaries }) => {
  console.log("diaries: ", diaries);
  return (
    <div className="DiaryList">
      {diaries.map(diary => (
        <SingleDiary content={diary.content} accessToken={accessToken} />
      ))}
    </div>
  );
};

export default DiaryList;
