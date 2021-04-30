import React from "react";
import "Signup.scss";
import axios from "axios";

axios.defaults.withCredentials = true;
//구현해야될 코드
//1. handleCancle취소버튼눌렀을때 로그인페이지로 돌아가는 함수
//2. handleSignUp회원가입버튼 눌렀을때 서버에 유저정보가 post되면서
//3. handleInputValue input값에 값이 입력될때 setstate로 값이 변화
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      id_confirm: "",
      password: "",
      password_confirm: "",
      nickname: "",
      errorMessage: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleCancel = this.handleCancel(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    //입력되는 값 변경 함수
  };

  handleCancel = () => {
    this.props.history.push("/Login");
    //취소버튼 누르면 로그인 페이지로 이동
  };

  handleSignup = () => {
    //버튼을 누르면 회원가입(정보가 서버에 저장)이 되면서 로그인페이지로 이동
    const { id, password, nickname } = this.state;
    if (!id || !password || !nickname) {
      this.setState({
        errorMessage: "모든 항목은 필수로 작성되야 합니다",
      }); //정보가 다 안들어가면
      return;
    } else {
      // 정보가 다 들어가면
      this.setState({
        errorMessage: "",
      });
    }
    axios
      .post("https://api.onelinediary.com/user/signup", {
        id: id,
        password: password,
        nickname: nickname,
      }) // id,pw,nick의 정보를 post로 보내줌
      .then((res) => {
        this.props.history.push("/Login");
      });
  };

  render() {
    return (
      <div>
        <h1>회원 가입</h1>
        <div>로고 타이틀?</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="아이디 박스">
            1<span>ID</span>
            <input
              type="text"
              onChange={this.handleInputValue("id")}
              placeholder="아이디를 입력해주세요"
            ></input>
          </div>

          <div className="아이디 확인박스">
            <span>ID Confirm</span>
            <input
              type="text"
              onChange={this.handleInputValue("id_confirm")}
              placeholder="아이디를 확인해주세요"
            ></input>
          </div>

          <div className="암호 박스">
            <span>Password</span>
            <input
              type="text"
              onChange={this.handleInputValue("password")}
              placeholder="비밀번호를 입력해주세요"
            ></input>
          </div>

          <div className="암호 확인박스">
            <span>Password Confirm</span>
            <input
              type="text"
              onChange={this.handleInputValue("password_confirm")}
              placeholder="비밀번호를 확인해주세요"
            ></input>
          </div>

          <div className="닉네임 박스">
            <span>Nickname</span>
            <input
              type="text"
              onChange={this.handleInputValue("nickname")}
              placeholder="닉네임을 입력해주세요"
            ></input>
          </div>

          <div className="버튼 박스">
            <button className="돌아가기" onClick={this.handleCancel}>
              돌아가기
            </button>
            <button className="가입버튼" onClick={this.handleSignup}>
              가입하기
            </button>
            {/* 에러메세지 핸들링 */}
            {this.state.errorMessage ? (
              <div className="alert-box">{this.state.errorMessage}</div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}
