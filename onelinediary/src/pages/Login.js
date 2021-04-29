import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Login.scss';

function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log({ id, password });
  });

  const handleLogin = () => {
    if (id === '' || password === '') {
      setErrorMessage('회원정보를 정확히 입력해주세요.')
    } else {
      axios.post('https://api.onelinediary.com/user/login',
        { id, password },
        { 'Content-Type': 'application/json', withCredentials: true }
      ).then((res) => {
        this.handleInputValue();
        // * 전달받은 토큰으로 App 컴포넌트에서 access token 상태 바뀌는 함수 호출
      }).catch(err => console.error(err));
    }
  }

  return (
    <div>
      <center>
          <div className='가장 큰 박스'>
            <div className='로고랑 이름 들어있는 박스'>
              <img id='logo' alt='logo' src='https://images.unsplash.com/photo-1479090793912-eb9929f4fdb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=876&q=80' />
              <div>한 줄 일기</div>
            </div>
            <div className='아이디 박스'>
              <span>ID</span>
              <input 
                type='id' placeholder='your id here'
                value={id}
                onChange={({target: {value}}) => setId(value)}
              ></input>
            </div>
            <div className='비밀번호 박스'>
              <span>password</span>
              <input 
                type='password' placeholder='your password here'
                value={password}
                onChange={({target: {value}}) => setPassword(value)}
              ></input>
            </div>
            <div className='버튼 박스'>
              <button
                className='로그인 버튼'
                onClick={handleLogin}
              >login</button>
              <button
                className='회원가입 버튼'
                // * 클릭 시 회원가입 페이지로 이동
              >sign-up</button>
            </div>
            <div className='에러메세지 창'>{errorMessage}</div>
          </div>
        </center>
      </div>
    )
  
}

export default Login;