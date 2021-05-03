import React from "react";
import "../styles/Signup.scss";
import axios from "axios";
// import { isId, isValidation } from "../stores/validation";

axios.defaults.withCredentials = true;
//구현해야될 코드
//1. handleCancle취소버튼눌렀을때 로그인페이지로 돌아가는 함수 X삭제
//2. handleSignUp회원가입버튼 눌렀을때 서버에 유저정보가 post되면서 O구현
//3. handleInputValue input값에 값이 입력될때 setstate로 값이 변화 O구현
//4. 아이디 비밀번호 닉네임 유효성검사 구현

// const checkPassword = (e) => {
//   //  8 ~ 10자 영문, 숫자 조합
//   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
//   // 형식에 맞는 경우 true 리턴
//   console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
// };
// const checkId = (e) => {
//   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
//   console.log("ID 유효성 검사 :: ", regExp.test(e.target.value));
// };
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      // id_confirm: "",
      idError: "",
      password: "",
      rePassword: "",
      nickname: "",
      errorMessage: "",
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.onChangeNickname = this.onChangeNickname.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChangeId = this.onChangeId(this);

    // this.handleCancel = this.handleCancel(this);
  }

  onChangeId = (id) => (e) => {
    this.setState({ [id]: e.target.value });
    this.validId();
    //입력되는 값 변경 함수
  };

  onChangePassword = (password) => (e) => {
    this.setState({ [password]: e.target.value });
    this.validPassword();
    //입력되는 값 변경 함수
  };

  onChangeRePassword = (rePassword) => (e) => {
    this.setState({ [rePassword]: e.target.value });
    this.validateRePassword();
    //입력되는 값 변경 함수
  };

  onChangeNickname = (nickname) => (e) => {
    this.setState({ [nickname]: e.target.value });
    this.validateNickname();
    //입력되는 값 변경 함수
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
        console.log("로그인페이지로 돌아감");
        this.props.history.push("/Login");
      });
  };
  validId = () => {
    // const { password, rePassword, nickname } = this.state;
    console.log("validId 실행됨");
    const validation = /^[a-zA-Z0-9]{5,11}$/;
    if (validation.test(this.state.id)) {
      this.setState.errorMessage("사용 가능한 ID입니다");
      return true;
    }
    this.setState.errorMessage("6~12자 이내 영문/숫자만 가능합니다.");
    return false;
  };

  validPassword = () => {
    // const { password, rePassword, nickname } = this.state;
    console.log("valiPw 실행됨");
    const validation = /^[a-zA-Z0-9]{5,11}$/;
    if (validation.test(this.state.password)) {
      this.setState.errorMessage("사용 가능한 비밀번호입니다");
      return true;
    }
    this.setState.errorMessage("6~12자 이내 영문/숫자만 가능합니다.");
    return false;
  };
  validateRePassword = () => {
    if (this.state.password === this.state.rePassword) {
      this.setState.errorMessage("비밀번호가 확인되었습니다.");
      return true;
    }
    this.setState.errorMessage("비밀번호가 같은지 다시 한 번 확인해주세요.");
    return false;
  };
  validateNickname = () => {
    const validation = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{1,9}$/;
    if (validation.test(this.state.nickname)) {
      this.setState.errorMessage("사용 가능한 닉네임입니다.");
      return true;
    }
    this.setState.errorMessage("2~10자 이내 한글/영문만 가능합니다.");
    return false;
  };

  // idValidation = () => {
  //   //id가 validation
  //   let idError = "";
  //   if (!isId(this.state.id)) {
  //     idError = "ID를 입력해주세요";
  //   }
  //   if (idError) {
  //     this.setState({ idError });
  //     return false;
  //   }
  //   return true;
  // };
  // onTextValidation = () => {
  //   if (!isValidation(this.state.id).success) {
  //     this.setState({ idError: isValidation(this.state.id.error) });
  //     return false;
  //   }
  //   return true;
  // };

  onSubmit = (e) => {
    e.preventDefault();
    const valid = this.onTextValidation();
    if (!valid) {
      console.log("check", this.state);
    }
  };
  render() {
    return (
      <div>
        <center>
          <h1>회원 가입</h1>
          <div>로고 타이틀?</div>

          <form onSubmit={this.onSubmit}>
            {/* <form onsubmit={handleSubmit(onSubmit)}> */}

            <form>
              <div className="아이디 박스">
                <span>ID</span>
                <input
                  className="input-id"
                  type="text"
                  name="id"
                  onChange={this.onChangeId("id")}
                  placeholder="아이디를 입력해주세요"
                />
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.idError}
                </div>
              </div>
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
              <span>Password</span>
              <input
                className="input-pw"
                type="text"
                onChange={this.onChangePassword("password")}
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>

            <div className="암호 확인박스">
              <span>Password Confirm</span>
              <input
                className="input-confirm-pw"
                type="text"
                onChange={this.onChangeRePassword("rePassword")}
                placeholder="비밀번호를 확인해주세요"
              ></input>
            </div>

            <div className="닉네임 박스">
              <span>Nickname</span>
              <input
                className="input-nick"
                type="text"
                onChange={this.onChangeNickname("nickname")}
                placeholder="닉네임을 입력해주세요"
              ></input>
            </div>

            <div className="버튼 박스">
              {/* <button className="돌아가기" onClick={this.handleCancel}>
              돌아가기
            </button> */}
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
        </center>
      </div>
    );
  }
}

export default Signup;

// {
/* function handleInputIdChange() {
  let valid = moreThanLength(inputId.value, 4);
  if (valid) {
    setAsValid("#input-id");
  } else {
    displayErrorMessage("#input-id", "아이디는 4자 이상을 입력하세요");
  }
}
function handleInputPwChange() {
  let valid = strongPassword(inputPassword.value);
  if (valid) {
    setAsValid("#input-pw");
  } else {
    displayErrorMessage(
      "#input-pw",
      "최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함입니다"
    );
  }
}
function handleInputPwReChange() {
  let valid = isPasswordMatches(inputPassword.value, inputPasswordRe.value);
  if (valid) {
    setAsValid("#input-pw-re");
  } else {
    displayErrorMessage("#input-pw-re", "비밀번호가 서로 다릅니다");
  }
}

// [유효성 검증 함수]
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}
function isPasswordMatches(pw, pwre) {
  return pw === pwre;
}
function moreThanLength(str, n) {
  return str.length >= n; // 항상 true 또는 false로 리턴하게 만드는 게 좋습니다.
} */

//유효성 검사 구현

//   handleCheck = () => {
//     //여기다 따로만들지
//     const checkPw = (e) => {
//       var reqExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//       console.log("비밀번호 유효성 검사 : ", reqExp.test(e.target.value));
//     };
//     const checkId = (e) => {
//       var reqExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     };
//   };
// }
//   handleCancel = () => {
//     this.props.history.push("/Login");
//     //취소버튼 누르면 로그인 페이지로 이동
//   };
