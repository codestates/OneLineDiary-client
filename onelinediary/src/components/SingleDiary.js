import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/SingleDiary.scss";
import dots from "../styles/select.png";

const SingleDiary = () => {
  const [menu] = useState(React.createRef());

  const menuToggle = () => {
    menu.current.classList.toggle("active");
  };

  const handleDelete = () => {
    axios
      .delete(
        "https://localhost:4000/main/delete",
        {
          headers: {
            // authorization: `Bearer ${props.accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
        // { props.userId, props.contents.contentId }
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
              <a href="#" className="delete">
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
