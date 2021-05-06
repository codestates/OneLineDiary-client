import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Login.scss";
require("dotenv").config();

function Login({
  loginHandler,
  issueAccessToken,
  userInfoHandler,
  handleResponseSuccess,
}) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (userId === "" || password === "") {
      setErrorMessage("회원정보를 모두 입력하셨나요?");
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          { userId, password },
          { "Content-Type": "application/json", withCredentials: true }
        )
        .then(res => {
          console.log("res.data: ", res.data);
          if (res.data.accessToken) {
            console.log("로그인 요청 성공");
            setIsValid(true);
            loginHandler();
            issueAccessToken(res.data.accessToken);
            userInfoHandler(res.data.userInfo);
            handleResponseSuccess(res.data);
            history.push("/main");
          } else {
            console.log("로그인 요청 실패");
            setErrorMessage("가입된 회원이 아닙니다.");
          }
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
        {isValid ? (
          <div className="btn-container">
            <button id="btn" className="login" onClick={handleLogin}>
              로그인
            </button>
            <button id="btn" className="signup">
              <Link to="/user/signup">회원가입</Link>
            </button>
            <div className="message-container">{errorMessage}</div>
          </div>
        ) : (
          <div className="btn-container">
            <button id="btn" className="login" onClick={handleLogin}>
              <Link to="/">로그인</Link>
            </button>
            <button id="btn" className="signup">
              <Link to="/user/signup">회원가입</Link>
            </button>
            <div className="message-container">{errorMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
