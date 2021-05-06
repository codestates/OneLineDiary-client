import React, { Component } from "react";
import SingleDiary from "./SingleDiary";
import "../styles/DiaryList.scss";

class DiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      preItems: 0,
    };
  }

  infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    // scrollTop = 페이지 내용시작부터 클라이언트가 보고있는 화면의 가장 위 값까지의 높이
    // clientHeight = 사용자가 보고있는 화면의 높이(항상 고정되어있음)
    // scrollHeight = 페이지 내용의 총 높이
    if (scrollTop + clientHeight === scrollHeight) {
      setTimeout(() => {
        this.setState({
          items: this.state.items + 10,
        });
      }, 1000);
      //콘솔이 여러개 뜨는 이유는?
      console.log("스크롤 끝에 도달했습니다");
    }
  };

  componentDidMount() {
    this.render();
    window.addEventListener("scroll", this.infiniteScroll, true);
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    let result = this.props.diaries.slice(
      this.state.preItems,
      this.state.items
    );
    return (
      <div className="DiaryList">
        {result.map(diary => (
          <SingleDiary
            key={diary.id}
            postId={diary.post_id}
            content={diary}
            contentHandler={this.props.contentHandler}
            accessToken={this.props.accessToken}
          />
        ))}
      </div>
    );
  }
}

export default DiaryList;
