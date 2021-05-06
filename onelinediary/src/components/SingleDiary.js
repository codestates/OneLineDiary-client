import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/SingleDiary.scss";
import "../styles/Main.scss";
import dots from "../styles/select.png";

const SingleDiary = ({ content, contentHandler, postId, accessToken }) => {
  const history = useHistory();
  const date = content.createdAt.slice(8, 10);

  const [menu] = useState(React.createRef());
  const menuToggle = () => {
    menu.current.classList.toggle("active");
  };

  const handleDelete = () => {
    let userID = localStorage.getItem("userId");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/main/delete`,
        { userId: content.userId, post_id: content.post_id },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then(() => {
        console.log("해당 일기가 삭제되었습니다.");
        axios
          .get(`${process.env.REACT_APP_API_URL}/main`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              withCredentials: true,
            },
          })
          .then(res => {
            contentHandler(res.data);
            history.push("/main");
          });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleCheckUserInfo = e => {
    let test = localStorage.getItem("userId");
    axios.patch(`${process.env.REACT_APP_API_URL}/main/update`, {});
  };

  return (
    <div className="singleDiary-container">
      <span className="sg-date">{date}</span>
      <span className="sg-emoji">
        {content.emoji === "love" ? (
          <span role="img" aria-label="love">
            😍
          </span>
        ) : content.emoji === "happy" ? (
          <span role="img" aria-label="happy">
            😁
          </span>
        ) : content.emoji === "bad" ? (
          <span role="img" aria-label="bad">
            😞
          </span>
        ) : content.emoji === "sad" ? (
          <span role="img" aria-label="sad">
            😥
          </span>
        ) : content.emoji === "angry" ? (
          <span role="img" aria-label="angry">
            😡
          </span>
        ) : content.emoji === "scared" ? (
          <span role="img" aria-label="scared">
            😱
          </span>
        ) : content.emoji === "sick" ? (
          <span role="img" aria-label="sick">
            🤧
          </span>
        ) : (
          <span></span>
        )}
      </span>
      <span className="sg-content">{content.content}</span>
      <div className="action">
        <div className="btn" onClick={menuToggle}>
          <img className="dots" src={dots} />
        </div>
        <div className="menu" ref={menu}>
          <ul>
            <li>
              <a href="#">
                <Link to="main/update" onClick={handleCheckUserInfo}>
                  수정
                </Link>
              </a>
            </li>
            <li>
              <a href="#" className="delete" onClick={handleDelete}>
                삭제
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SingleDiary;
