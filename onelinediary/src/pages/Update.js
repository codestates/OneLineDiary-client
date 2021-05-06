import React from "react";
import axios from "axios";

//0.update창에서 구현해야할것
//1.서버에 저장된 content를 get요청으로 받아오고
//componentdidmount로 받아온상태를 유지해야한다
//2.수정된 content를 다시 post요청으로 저장시켜줘야한다
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      emoji: "",
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.contentLoaded();
  }

  contentLoaded() {
    return axios.get("https://api.onelinediary.com/main/post");
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
    //입력되는 값 변경 함수
  };

  handleSubmit = () => {
    const { content, emoji } = this.state;
    if (!content || !emoji) {
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
      .post("https://api.onelinediary.com/main/update", {
        content: content,
        emoji: "?",
      }) // id,pw,nick의 정보를 post로 보내줌
      .then(res => {
        this.props.history.push("/main");
      });
  };

  render() {
    return (
      <div>
        <span role="img" aria-label="close"></span>
        <input
          type="text"
          maxLength="50"
          onChange={this.handleInputValue("content")}
        />
        <div>
          <button className="postBtn" type="submit" onClick={this.handleSubmit}>
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
