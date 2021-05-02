import React from "react";
import "../styles/SingleDiary.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import optionIcon from "../styles/select.png";

const SingleDiary = () => {
  // const handleOptions = () => {};

  return (
    <div className="singleDiary">
      <span className="date">date</span>
      <img className="emoji" src="" alt=""></img>
      <span className="content">content</span>
      {/* <button onClick={handleOptions} img={optionIcon}></button> */}
    </div>
  );
};
export default SingleDiary;
