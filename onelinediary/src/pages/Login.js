import React, { Component } from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errorMessage: ''
    }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  }

  handleLogin = () => {
    const { id, password } = this.state;
    if (id === '' || password === '') {
      this.setState({ errorMessage: '회원정보를 정확히 입력해주세요.'})
    } else {
      axios.post('https://api.onelinediary.com/user/login',
        { id, password },
        { 'Content-Type': 'application/json', withCredentials: true }
      ).then((res) => {
        this.props.handleInputValue();
        // * 전달받은 토큰으로 App 컴포넌트에서 access token 상태 바뀌는 함수 호출
      }).catch(err => console.error(err));
    }
  }

  render() {
    return (
      <div>
        <center>
          <div className='가장 큰 박스'>
            <div className='로고랑 이름 들어있는 박스'>
              <img id='logo' alt='website-logo' src={/*로고*/} />
              <div>한 줄 일기</div>
            </div>
            <div className='아이디 박스'>
              <div>ID</div>
              <input 
                type='id' placeholder='your id here'
                value={this.state.id}
                onChange={this.handleInputValue('id')}
              ></input>
            </div>
            <div className='비밀번호 박스'>
              <div>password</div>
              <input 
                type='password' placeholder='your password here'
                value={this.state.password}
                onChange={this.handleInputValue('password')}
              ></input>
            </div>
            <div className='버튼 박스'>
              <button
                className='로그인 버튼'
                onClick={this.handleLogin}
              >login</button>
              <button
                className='회원가입 버튼'
                // * 클릭 시 회원가입 페이지로 이동
              >sign-up</button>
            </div>
            <div className='에러메세지창'>{this.state.errorMessage}</div>
          </div>
        </center>
      </div>
    )
  }
  
}

export default Login;