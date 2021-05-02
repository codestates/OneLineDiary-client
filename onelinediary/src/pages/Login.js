import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.scss";

function Login(props) {
  // console.log(props);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log({ userId, password });
  });

  const handleLogin = () => {
    if (userId === "" || password === "") {
      setErrorMessage("회원정보를 정확히 입력해주세요.");
    } else {
      axios
        .post(
          "https://localhost:4000/user/login",
          { userId, password },
          { "Content-Type": "application/json", withCredentials: true }
        )
        .then(res => {
          this.props.loginHandler();
          this.props.issueAccessToken();
          this.props.userInfoHandler(res.userInfo);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="top-container">
      {/* <center> */}
      <div className="contents-container">
        <div className="logo-container">
          <div id="logo">
            한 줄<br />일 기
          </div>
        </div>
        <div className="id-container">
          <span className="title id">아이디</span>
          <input
            type="id"
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={({ target: { value } }) => setUserId(value)}
          ></input>
        </div>
        <div className="pw-container">
          <span className="title pw">비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          ></input>
        </div>
        <div className="btn-container">
          <button id="btn" className="login" onClick={handleLogin}>
            로그인
          </button>
          <button id="btn" className="signup">
            <Link to="/user/signup">회원가입</Link>
          </button>
        </div>
        <div className="message-container">{errorMessage}</div>
      </div>
      {/* </center> */}
    </div>
  );
}

export default Login;
