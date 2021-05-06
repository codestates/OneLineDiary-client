import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Main.scss";
require("dotenv").config();

const Section = ({ accessToken, userInfo, logoutHandler }) => {
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        { userId: userInfo.userId },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then(() => {
        console.log("로그아웃 완료");
        logoutHandler();
      });
  };

  return (
    <div className="sc-section-container">
      <div className="greeting">
        {userInfo.nickname} 님,
        <br />
        오늘 하루는 어떠셨나요?
      </div>
      <div className="sc-btn-container">
        <button id="sc-btn-userinfo">
          <Link to="mypage/userinfo">회원정보</Link>
        </button>
        <button id="sc-btn-logoout" onClick={handleLogout}>
          <Link to="/">로그아웃</Link>
        </button>
      </div>
    </div>
  );
};

export default Section;
