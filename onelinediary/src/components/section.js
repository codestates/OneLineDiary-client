import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const section = () => {
  const handleLogout = () => {
    axios.post(
      "https://localhost:4000/user/logout",
      {
        Headers: {
          //   authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
      // { props.userInfo.userId }
    );
  };

  return (
    <div>
      <section>
        누구누구 님,
        <br />
        오늘 하루는 어떠셨나요?
      </section>
      <div className="btn-conatiner">
        <button className="btn-userinfo">
          <Link to="mypage/userinfo">회원정보</Link>
        </button>
        <button class="btn-logoout" onClick={handleLogout}>
          <Link to="user/login">로그아웃</Link>
        </button>
      </div>
    </div>
  );
};

export default section;
