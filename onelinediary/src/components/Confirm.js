import React from "react";
import "../styles/Confirm.scss";

const Confirm = () => {
  return (
    <div>
      <div className="modal" id="modal">
        <div className="modal-header">
          <div className="question">일기를 삭제하시겠어요?</div>
        </div>
        <div className="modal-body">
          <button className="btn-yes">네</button>
          <button className="btn-no">아니요</button>
        </div>
      </div>
      <div id="overlay"></div>
    </div>
  );
};

export default Confirm;
