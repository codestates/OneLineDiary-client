import React from 'react';

function Login() {
  return (
    <div>
      <center>
        <div className="가장큰박스">
          <div className="로고랑이름들어있는박스">
            <img src="로고주소"></img>
            <div>한 줄 일기</div>
          </div>
          <div className="아이디박스">
            <div>ID</div>
            <input type='id' placeholder='your id here'></input>
          </div>
          <div className="비밀번호박스">
            <div>password</div>
            <input type='password' placeholder='your password here'></input>
          </div>
          <div className="버튼박스">
            <button>login</button>
            <button>sign-up</button>
          </div>
        </div>
      </center>
    </div>
  )
}

export default Login;