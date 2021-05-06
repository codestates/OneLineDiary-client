import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.scss";
require("dotenv").config();

const Signup = () => {
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const onChangeId = useCallback(
    e => {
      console.log({ userId: e.target.value });
      setId(e.target.value);
      validateId();
    },
    [userId]
  );

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

  const validateId = () => {
    const validation = /^[a-zA-Z0-9]{8,15}$/;
    if (validation.test(userId)) {
      setMessage("사용 가능한 ID입니다.");
      return true;
    }
    setMessage("6~15자 이내 영문/숫자만 가능합니다.");
    return false;
  };

  const validatePassword = () => {
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

  const handleSignup = () => {
    //버튼을 누르면 회원가입(정보가 서버에 저장)이 되면서 로그인페이지로 이동
    if (userId === "" || password === "" || nickname === "") {
      setMessage("모든 항목은 필수로 작성되야 합니다");
      //정보가 다 안들어가면
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          userId,
          password,
          nickname,
        })
        .then(res => {
          console.log(res);
          history.push("/");
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="su-top-container">
      <div className="su-contents-container">
        <div className="su-title-container">
          <h1>한 줄 일기의 유저가 되어보세요</h1>
        </div>
        <div className="su-userinfo-container">
          <div id="su-id-box">
            <span className="su-title-id">아이디</span>
            <input
              className="su-input-id"
              type="text"
              name="id"
              onChange={onChangeId}
              // placeholder="아이디를 입력해주세요"
            />
          </div>
          <div id="su-pw-box">
            <span className="su-title-pw">비밀번호</span>
            <input
              className="su-input-pw"
              type="password"
              onChange={onChangePassword}
              // placeholder="비밀번호를 입력해주세요"
            ></input>
          </div>
          <div id="su-repw-box">
            <span className="su-title-repw">비밀번호 확인</span>
            <input
              className="su-input-repw"
              type="password"
              onChange={onChangeRePassword}
              // placeholder="비밀번호를 확인해주세요"
            ></input>
          </div>
          <div id="su-nickname-box">
            <span className="su-title-nickname">닉네임</span>
            <input
              className="su-input-nickname"
              type="text"
              onChange={onChangeNickname}
              // placeholder="닉네임을 입력해주세요"
            ></input>
          </div>
        </div>
        <div className="su-btn-container">
          <button id="su-btn-back">
            <Link to="/">back</Link>
          </button>
          <button id="su-btn-signup" onClick={handleSignup}>
            sign-up
          </button>
        </div>
        <div className="su-message-container">
          <div id="su-message">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
