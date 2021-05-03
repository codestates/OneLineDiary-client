// * props로 받을거: userInfo, accessToken, logoutHandler
// * state: contents (배열)
// * 일기목록 요청하는 함수 (GET)

import React, { useState, useEffect } from "react";
import axios from "axios";
import Section from "../components/Section";
import DiaryList from "../components/DiaryList";
import "../styles/Main.scss";

const Main = ({ userInfo, accessToken, logoutHandler }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:4000/main", {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then(res => {
        console.log(res.data);
        setContents(res.data);
      });
  });

  return (
    <div className="body">
      <div className="section">
        <Section />
      </div>
      <div className="diarylist">
        <DiaryList diaries={contents} accessToken={accessToken} />
      </div>
    </div>
  );
};

export default Main;
