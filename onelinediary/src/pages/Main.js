import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import DiaryList from "../components/DiaryList";
import "../styles/Main.scss";

const Main = ({
  accessToken,
  userInfo,
  content,
  contentHandler,
  logoutHandler,
}) => {
  return (
    <div>
      {content === null ? (
        "작성하신 일기가 없습니다."
      ) : (
        <div className="ma-top-container">
          <div className="ma-contents-container">
            <div className="section-container">
              <Section
                accessToken={accessToken}
                userInfo={userInfo}
                logoutHandler={logoutHandler}
              />
            </div>
            <div className="diary-conatiner">
              <div>
                <div className="month">5월</div>
              </div>
              <div className="diary">
                <DiaryList
                  accessToken={accessToken}
                  diaries={content}
                  contentHandler={contentHandler}
                />
              </div>
              <div className="write-diary">
                <Link to="/main/post">클릭하여 오늘의 하루를 남겨보세요.</Link>
              </div>
            </div>
            <div className="ma-logo-container">
              <div className="ma-logo">
                <div id="ma-text-in-logo">
                  한 줄<br />일 기
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
