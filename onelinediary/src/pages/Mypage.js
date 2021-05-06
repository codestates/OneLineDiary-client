import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/Mypage.scss";

const Mypage = ({ userInfo, userInfoHandler, accessToken }) => {
  console.log(userInfo);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  require("dotenv").config();

  const updateUserInfo = () => {
    console.log("업데이트 요청 보냄");
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/mypage/editUserinfo`,
        { userId: userInfo.id, nickname: nickname, password: password },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then(res => {
        console.log("업데이트 완료");
        console.log(res.data);
        setId(res.data.userInfo.id);
        userInfoHandler(res.data.userInfo);
        cleanInput();
        history.push("/mypage/userinfo");
      });
  };

  const cleanInput = () => {
    setPassword("");
    setRePassword("");
    setNickname("");
    setMessage("");
  };

  const onChangePassword = useCallback(
    e => {
      console.log({ password: e.target.value });
      setPassword(e.target.value);
      validatePassword();
    },
    [password]
  );

  const onChangeRePassword = useCallback(
    e => {
      console.log({ rePassword: e.target.value });
      setRePassword(e.target.value);
      validateRePassword();
    },
    [rePassword]
  );

  const onChangeNickname = useCallback(
    e => {
      console.log({ nickname: e.target.value });
      setNickname(e.target.value);
      validateNickname();
    },
    [nickname]
  );

  const validatePassword = () => {
    console.log("validatePassword 실행됨");
    const validation = /^[a-zA-Z0-9]{5,11}$/;
    if (validation.test(password)) {
      setMessage("사용 가능한 비밀번호입니다.");
      return true;
    }
    setMessage("6~12자 이내 영문/숫자만 가능합니다.");
    return false;
  };

  const validateRePassword = () => {
    if (password === rePassword) {
      setMessage("비밀번호가 확인되었습니다.");
      return true;
    }
    setMessage("비밀번호가 같은지 다시 한 번 확인해주세요.");
    return false;
  };

  const validateNickname = () => {
    const validation = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{1,9}$/;
    if (validation.test(nickname)) {
      setMessage("사용 가능한 닉네임입니다.");
      return true;
    }
    setMessage("2~10자 이내 한글/영문만 가능합니다.");
    return false;
  };

  return (
    <div className="mp-top-container">
      <div className="mp-contents-container">
        <div className="mp-title-container">
          <h1>{userInfo.nickname} 님의 프로필</h1>
        </div>
        <div className="mp-userinfo-container">
          <div className="mp-id">
            <span id="mp-id">ID</span>
            <span className="mp-input-id">{userInfo.id}</span>
          </div>
          <div className="mp-pw">
            <span id="mp-pw">password</span>
            <input
              className="mp-input-pw"
              type="password"
              placeholder="새로운 비밀번호"
              value={password}
              onChange={onChangePassword}
            ></input>
            <div></div>
          </div>
          <div className="mp-re-pw">
            <span id="mp-re-pw">confirm password</span>
            <input
              className="mp-input-re-pw"
              type="password"
              placeholder="새 비밀번호 확인"
              value={rePassword}
              onChange={onChangeRePassword}
            ></input>
          </div>
          <div className="mp-nickname">
            <span id="mp-nickname">nickname</span>
            <input
              className="mp-input-nickname"
              type="text"
              placeholder="새로운 닉네임"
              value={nickname}
              onChange={onChangeNickname}
            ></input>
          </div>
        </div>
        <div className="mp-extra-container">
          <div className="mp-btn">
            <button id="mp-btn-back">
              <Link to="/main">back</Link>
            </button>
            <button id="mp-btn-update" onClick={updateUserInfo}>
              {/* <Redirect to="/mypage/userinfo">update</Redirect> */}
              update
            </button>
          </div>
          <div className="mp-message">
            <div id="mp-message">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
