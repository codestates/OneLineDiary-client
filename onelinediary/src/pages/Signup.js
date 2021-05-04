import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log(
      "유저정보 보내주는 post 요청 실행됨",
      userId,
      password,
      nickname
    );
  });

  const onChangeId = useCallback(
    (e) => {
      console.log({ userId: e.target.value });
      setId(e.target.value);
      validateId();
    },
    [userId]
  );

  const onChangePassword = useCallback(
    (e) => {
      console.log({ password: e.target.value });
      setPassword(e.target.value);
      validatePassword();
    },
    [password]
  );

  const onChangeRePassword = useCallback(
    (e) => {
      console.log({ rePassword: e.target.value });
      setRePassword(e.target.value);
      validateRePassword();
    },
    [rePassword]
  );

  const onChangeNickname = useCallback(
    (e) => {
      console.log({ nickname: e.target.value });
      setNickname(e.target.value);
      validateNickname();
    },
    [nickname]
  );

  const validateId = () => {
    console.log("validateId 실행됨");
    const validation = /^[a-zA-Z0-9]{8,15}$/;
    if (validation.test(userId)) {
      setMessage("사용 가능한 ID입니다.");
      return true;
    }
    setMessage("6~15자 이내 영문/숫자만 가능합니다.");
    return false;
  };

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
  const handleSignup = () => {
    //버튼을 누르면 회원가입(정보가 서버에 저장)이 되면서 로그인페이지로 이동
    if (userId === "" || password === "" || nickname === "") {
      setMessage("모든 항목은 필수로 작성되야 합니다");
      //정보가 다 안들어가면
      return;
    } else {
      axios
        .post("https://localhost:4000/user/signup", {
          userId,
          password,
          nickname,
        })
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <center>
        <h1>회원 가입</h1>

        {/* <form onSubmit={this.onSubmit}> */}
        <form>
          <div className="아이디 박스">
            <span>아이디</span>
            <input
              className="input-id"
              type="text"
              name="id"
              onChange={onChangeId}
              placeholder="아이디를 입력해주세요"
            />
          </div>
          {/* </div> */}
        </form>
        {/* 
            <div className="아이디 확인박스">
              <span>ID Confirm</span>
              <input
                className="input-confirm-id"
                type="text"
                onChange={this.handleInputValue("id_confirm")}
                placeholder="아이디를 확인해주세요"
                // onBlur={checkId}
              ></input>
            </div> */}

        <div className="암호 박스">
          <span>비밀번호</span>
          <input
            className="input-pw"
            type="password"
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          ></input>
        </div>

        <div className="암호 확인박스">
          <span>비밀번호 확인</span>
          <input
            className="input-confirm-pw"
            type="password"
            onChange={onChangeRePassword}
            placeholder="비밀번호를 확인해주세요"
          ></input>
        </div>

        <div className="닉네임 박스">
          <span>닉네임</span>
          <input
            className="input-nick"
            type="text"
            onChange={onChangeNickname}
            placeholder="닉네임을 입력해주세요"
          ></input>
        </div>

        <div className="버튼 박스">
          {/* <button className="돌아가기" onClick={this.handleCancel}>
              돌아가기
            </button> */}
          <button className="가입버튼" onClick={handleSignup}>
            가입하기
          </button>
          <div>
            <div className="message-box">{message}</div>
          </div>
        </div>
        {/* </form> */}
      </center>
    </div>
  );
};

export default Signup;
