import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "../styles/Post.scss";

import smile from "../styles/emoji_smile.png";
import cry from "../styles/emoji_cry.png";
import heart from "../styles/emoji_heart.png";
import think from "../styles/emoji_think.png";
import headache from "../styles/emoji_headache.png";
import emo_btn from "../styles/emoji_button.png";

//1.post창에서 구현해야할것
//50자를 넘으면 경고 메세지?
//
// class Post extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       content: "",
//       emoji: "",
//       errorMessage: "",
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);

//   }

//   handleInputValue = (key) => (e) => {
//     this.setState({ [key]: e.target.value });
//     //입력되는 값 변경 함수
//   };

//   handleSubmit = () => {
//     const { content, emoji } = this.state;
//     if (!content || !emoji) {
//       this.setState({
//         errorMessage: "모든 항목은 필수로 작성되야 합니다",
//       }); //정보가 다 안들어가면
//       return;
//     } else {
//       // 정보가 다 들어가면
//       this.setState({
//         errorMessage: "",
//       });
//     }
//     axios
//       .post("https://localhost.com/main/post", {
//         content: content,
//         emoji: "",
//       }) // id,pw,nick의 정보를 post로 보내줌
//       .then((res) => {
//         this.props.history.push("/main");
//       });
//   };

const Post = (props) => {
  const [menu] = useState(React.createRef());
  const [content, setContent] = useState("");
  const [emoji, setEmoji] = useState("");

  const menuToggle = () => {
    menu.current.classList.toggle("active");
  };

  const handlePost = () => {
    axios
      .post("https://localhost:4000/main/post", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
        content,
        emoji,
      })
      .then(() => {
        console.log("해당 일기가 기록되었습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const Emoji = (props) => (
    <option
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
      value={props.label}
    >
      {props.symbol}
    </option>
  );
  // const handleSubmit = () => {
  //   if (!content || !emoji) {
  //     this.setState({
  //       errorMessage: "모든 항목은 필수로 작성되야 합니다",
  //     }); //정보가 다 안들어가면
  //     return
  //   } else {
  //     // 정보가 다 들어가면
  //     this.setState({
  //       errorMessage: "",
  //     });
  //   }
  const options = useMemo(
    () => [
      { value: "smile_emoji", label: smile, src: smile },
      { value: cry, label: "cry_emoji" },
      { value: heart, label: "heart_emoji" },
      { value: think, label: "think_emoji" },
      { value: headache, label: "headache_emoji" },
    ],
    []
  );
  return (
    <div>
      <span></span>
      <div className="action">
        <div className="btn-emoji" onClick={menuToggle}>
          {/* <img className="emo_btn" src={emo_btn} /> */}
        </div>
        {/* <div className="emoji_menu" ref={menu}> */}
        {/* <select onChange={(e) => {console.log(e.target.value)}} name='emoji_select'> */}
        <div className="category">Emoji Select</div>
        <Select className="emoji_box" options={options} />

        {/* <div className="category">Select that is initially open</div>
        <Select options={options} defaultValue={options[0]} defaultMenuIsOpen /> */}

        {/* </select> */}
      </div>

      <input type="text" maxLength="50" onChange={content} />
      <div>
        <button className="postBtn" type="submit" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
