import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Post from "./pages/Post";
import Update from "./pages/Update";
import Mypage from "./pages/Mypage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: null,
      accessToken: "",
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.userInfoHandler = this.userInfoHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
  }

  loginHandler() {
    this.setState({ isLogin: true });
  }

  logoutHandler() {
    this.setState({ isLogin: false });
  }

  userInfoHandler(info) {
    this.setState({ userInfo: info });
  }

  issueAccessToken(token) {
    this.setState({ accessToken: token });
  }

  render() {
    const { userInfo, accessToken } = this.state;
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
              />
            )}
          />
          <Route path="/user/signup" render={() => <Signup />} />
          <Route
            path="/main"
            render={() => (
              <Main
                userInfo={userInfo}
                accessToken={accessToken}
                logoutHandler={this.logoutHandler}
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
