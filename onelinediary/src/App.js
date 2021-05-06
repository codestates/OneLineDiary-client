import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Update from "./pages/Update";
import Mypage from "./pages/Mypage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
      userInfo: null,
      postContent: [],
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.userInfoHandler = this.userInfoHandler.bind(this);
    this.contentHandler = this.contentHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
    this.handleResponseSuccess = this.handleResponseSuccess.bind(this);
  }

  loginHandler() {
    this.setState({ isLogin: true });
  }

  logoutHandler() {
    this.setState({ isLogin: false });
  }

  userInfoHandler(info) {
    console.log("userInfoHandler 호출됨");
    this.setState({ userInfo: info });
  }

  contentHandler(data) {
    this.setState({ postContent: data });
  }

  issueAccessToken(token) {
    this.setState({ accessToken: token });
  }

  handleResponseSuccess(data) {
    console.log(data);
    localStorage.setItem("userId", data.userInfo.id);
    axios
      .get("https://localhost:4000/main", {
        headers: {
          authorization: `Bearer ${data.accessToken}`,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then(res => {
        console.log(res);
        if (data.userInfo.id === res.data[0].userId) {
          console.log("아이디가 일치합니다");
          this.setState({ postContent: res.data });
        } else {
          this.setState({ postContent: ["아이디가 일치하지 않습니다"] });
        }
      });
  }

  componentDidUpdate() {
    console.log("updated!");
  }

  render() {
    const { userInfo, accessToken, postContent } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                loginHandler={this.loginHandler}
                userInfoHandler={this.userInfoHandler}
                issueAccessToken={this.issueAccessToken}
                handleResponseSuccess={this.handleResponseSuccess}
              />
            )}
          />
          <Route path="/user/signup" render={() => <Signup />} />
          <Route
            exact
            path="/main"
            render={() => (
              <Main
                userInfo={userInfo}
                accessToken={accessToken}
                logoutHandler={this.logoutHandler}
                content={postContent}
                contentHandler={this.contentHandler}
              />
            )}
          />
          <Route
            path="/main/post"
            render={() => <Post accessToken={accessToken} />}
          />
          <Route
            path="/main/update"
            crender={() => <Update accessToken={accessToken} />}
          />
          <Route
            path="/mypage/userinfo"
            render={() => (
              <Mypage
                userInfo={userInfo}
                accessToken={accessToken}
                userInfoHandler={this.userInfoHandler}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
