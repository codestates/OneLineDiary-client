import React from "react";
import "../styles/SingleDiary.scss";
const SingleDiary = () => {
  return (
    <center>
      <div className="singleDiary">
        <span className="date">date</span>
        <img className="emoji" src="" alt=""></img>
        <span className="content">content</span>

        <button>update,delete button</button>
      </div>
    </center>
  );
};
export default SingleDiary;
