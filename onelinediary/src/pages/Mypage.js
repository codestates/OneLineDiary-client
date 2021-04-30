import React, { useState, useEffect } from "react";

// * App 컴포넌트로부터 회원 정보를 받아와 렌더링
// * back 버튼 클릭 시 메인페이지로 이동하는 함수 호출
// * update 버튼 클릭 시 입력한 비밀번호 혹은 닉네임과 함께 patch 요청
// *

function Mypage(props) {
  // console.log(props);
  const [id] = useState(props.userInfo.id);
  const [password, setPassword] = useState(props.userInfo.password);
  const [nickname, setNickname] = useState(props.userInfo.nickname);

  const checkPassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const checkNickname = e => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  // *
  //   handleResponseSuccess() {
  //     axios.get('https://api.onelinediary.com/mypage/userinfo',
  //     )
  //   }

  return props.userInfo ? (
    <div>
      <center>
        <div className="mypageContainer"></div>
        <h1>{props.userInfo.nickname}님의 my page 입니다.</h1>
        <div>
          <div className="user-info-box">
            <div>
              <div className="title-id">ID</div>
              <span className="input-id">{props.userInfo.id}</span>
            </div>
            <div>
              <div className="title-pw">password</div>
              <input
                className="input-pw"
                placeholder="새로운 비밀번호를 입력해주세요."
              ></input>
            </div>
            <div>
              <div className="confirmPw">confirm password</div>
              <input
                className="input-confirm-pw"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
              ></input>
            </div>
            <div>
              <div className="nickname">nickname</div>
              <input className="input-nickname"></input>
            </div>
          </div>
          <div className="btn-box">
            <button className="btn-back" onClick={props.handleBack}>
              back
            </button>
            <button className="btn-back" onClick={props.handleUpdate}>
              update
            </button>
          </div>
        </div>
      </center>
    </div>
  ) : (
    <div></div>
  );
}

export default Mypage;
