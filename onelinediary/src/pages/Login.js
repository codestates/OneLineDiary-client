import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.scss";

function Login({ loginHandler, issueAccessToken, userInfoHandler }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "회원정보를 정확히 입력해주세요."
  );

  useEffect(() => {
    console.log({ userId, password });
  });

  const handleLogin = () => {
    if (
      userId === "" ||
      password === "" ||
      (userId === "" && password === "")
    ) {
      setErrorMessage("회원정보를 모두 입력하셨나요?");
    } else {
      axios
        .post(
          "https://localhost:4000/user/login",
          { userId, password },
          { "Content-Type": "application/json", withCredentials: true }
        )
        .then(res => {
          // console.log("res.data: ", res.data);
          loginHandler();
          issueAccessToken(res.data.accessToken);
          userInfoHandler(res.data.userInfo);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="top-container">
      <div className="contents-container">
        <div className="logo-container">
          <div className="logo">
            <div id="text-in-logo">
              한 줄<br />일 기
            </div>
          </div>
        </div>
        <div className="id-container">
          <span className="title id">아이디</span>
          <input
            type="id"
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={({ target: { value } }) => {
              setUserId(value);
              setErrorMessage("");
            }}
          ></input>
        </div>
        <div className="pw-container">
          <span className="title pw">비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          ></input>
        </div>
        {errorMessage ? (
          <div className="btn-container">
            <button id="btn" className="login" onClick={handleLogin}>
              <Link to="/">로그인</Link>
            </button>
            <button id="btn" className="signup">
              <Link to="/user/signup">회원가입</Link>
            </button>
            <div className="message-container">{errorMessage}</div>
          </div>
        ) : (
          <div className="btn-container">
            <button id="btn" className="login" onClick={handleLogin}>
              <Link to="/main">로그인</Link>
            </button>
            <button id="btn" className="signup">
              <Link to="/user/signup">회원가입</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
