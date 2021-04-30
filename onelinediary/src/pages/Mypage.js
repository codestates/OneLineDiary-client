import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Mypage = props => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [profileNickname, setprofileNickname] = useState("");

  useEffect(() => {
    console.log("유저정보 가져오는 GET 요청 실행됨");
    axios
      .get("https://localhost:4000/mypage/userinfo", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then(res => {
        setId(res.id);
        setprofileNickname(res.profileNickname);
      })
      .catch(err => console.error(err));
  }, []);

  const updateUserInfo = () => {
    setPassword("");
    setRePassword("");
    setNickname("");
    setMessage("");
    axios
      .patch(
        "https://localhost:4000/mypage/editUserinfo",
        {
          headers: {
            authorization: `Bearer ${props.accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        },
        { id, nickname, password }
      )
      .then(res => {
        setprofileNickname(res.nickname);
        setPassword(res.password);
      });
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
    const validation = /^[a-zA-Z0-9]{6,12}$/;
    if (validation.test(password)) {
      setMessage("사용 가능한 비밀번호입니다.");
      return true;
    }
    setMessage("6~12자 이내 영문/숫자만 가능합니다.");
    return false;
  };

  const validateRePassword = () => {
    if (validatePassword) {
      if (password === rePassword) {
        setMessage("비밀번호가 확인되었습니다.");
        return true;
      }
      setMessage("비밀번호가 같은지 다시 한 번 확인해주세요.");
      return false;
    }
  };

  const validateNickname = () => {
    const validation = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
    if (validation.test(nickname)) {
      setMessage("사용 가능한 닉네임입니다.");
      return true;
    }
    setMessage("2~10자 이내 영문/한글만 가능합니다.");
    return false;
  };

  return (
    <div>
      <center>
        <div className="mypageContainer"></div>
        <h1>{profileNickname}님의 프로필</h1>
        <div>
          <div className="user-info-box">
            <div>
              <span className="title-id">ID</span>
              <span className="input-id">{id}아이디 자리</span>
            </div>
            <div>
              <span className="title-pw">password</span>
              <input
                className="input-pw"
                type="password"
                placeholder="your new password"
                value={password}
                onChange={onChangePassword}
              ></input>
              <div></div>
            </div>
            <div>
              <span className="confirmPw">confirm password</span>
              <input
                className="input-confirm-pw"
                type="password"
                placeholder="confirm password"
                value={rePassword}
                onChange={onChangeRePassword}
              ></input>
            </div>
            <div>
              <span className="nickname">nickname</span>
              <input
                className="input-nickname"
                type="text"
                placeholder="your new nickname"
                value={nickname}
                onChange={onChangeNickname}
              ></input>
            </div>
          </div>
          <div>
            <div className="message-box">{message}</div>
          </div>
          <div className="btn-box">
            <button className="btn-back" onClick={updateUserInfo}>
              update
            </button>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Mypage;
