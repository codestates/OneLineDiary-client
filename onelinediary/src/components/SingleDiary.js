import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/SingleDiary.scss";
import dots from "../styles/select.png";

const SingleDiary = ({ content, accessToken }) => {
  const [menu] = useState(React.createRef());

  const menuToggle = () => {
    menu.current.classList.toggle("active");
  };

  const handleDelete = () => {
    axios
      .post(
        "https://localhost:4000/main/delete",
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        },
        { userId: content.userId, post_id: content.post_id }
      )
      .then(() => {
        console.log("해당 일기가 삭제되었습니다.");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="singleDiary">
      <span className="date">date</span>
      <img className="emoji" src="" alt=""></img>
      <span className="content">content</span>
      <div className="action">
        <div className="btn" onClick={menuToggle}>
          <img className="dots" src={dots} />
        </div>
        <div className="menu" ref={menu}>
          <ul>
            <li>
              <a href="#">
                <Link to="main/update">수정</Link>
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
