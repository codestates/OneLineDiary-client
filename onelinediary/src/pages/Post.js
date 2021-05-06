import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Post.scss";
require("dotenv").config();

const Post = ({ accessToken }) => {
  const [content, setContent] = useState("");
  const [emoji, setEmoji] = useState("");

  const handlePost = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/main/post`,
        { content, emoji },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("해당 일기가 기록되었습니다.");
      })
      .catch(err => {
        console.error(err);
      });
  };

  const emojiChange = e => {
    setEmoji(e.target.value);
    console.log("emoji:", e);
  };

  const emojiCollection = [
    ["love", "😍"],
    ["happy", "😁"],
    ["bad", "😞"],
    ["sad", "😥"],
    ["angry", "😡"],
    ["scared", "😱"],
    ["sick", "🤧"],
  ];

  const emojiOptions = emojiCollection.map((emoji, index) => {
    return (
      <option value={emoji[0]} key={index}>
        {emoji[1]}
      </option>
    );
  });

  return (
    <div className="post-top-container">
      <div className="post-contents-container">
        <div className="post-title-container">
          <div id="post-title">오늘 하루는 어떠셨나요?</div>
        </div>
        <div className="post-write-container">
          <div className="post-emoji-box">
            <select
              className="post-emoji-select"
              value={emoji}
              onChange={emojiChange}
            >
              {emojiOptions}
            </select>
          </div>
          <div className="post-input-box">
            <input
              className="input-post"
              type="text"
              value={content}
              maxLength="50"
              onChange={({ target: { value } }) => setContent(value)}
            />
          </div>
        </div>
        <div className="post-btn-container">
          <button id="btn-post" onClick={handlePost}>
            <Link to="/main">오늘 하루 기록하기</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
