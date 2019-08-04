import React, { Component } from "react";
import "./App.css";
import NavBarContainer from "./containers/NavBarContainer/NavBarContainer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import CoursesContainer from "./containers/CoursesContainer/CoursesContainer";
import FooterContainer from "./containers/FooterContainer/FooterContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.authHandler = this.authHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);

    this.state = {
      authToken:
        localStorage.getItem("authToken") == null
          ? ""
          : localStorage.getItem("authToken"),
      userId: localStorage.getItem("userId"),
      firstName: localStorage.getItem("firstName"),
      Student: localStorage.getItem("Student"),
      Teacher: localStorage.getItem("Teacher"),
      Admin: localStorage.getItem("Admin")
    };
  }

  authHandler = (fieldName, value) => {
    this.setState({ [fieldName]: value });
    localStorage.setItem(fieldName, value);
  };

  logoutHandler = () => {
    this.authHandler("authToken", "");
    this.authHandler("userId", "");
    this.authHandler("firstName", "");
    this.authHandler("Student", false);
    this.authHandler("Teacher", false);
    this.authHandler("Admin", false);
  };

  render() {
    return (
      <div className="App">
        <Route
          render={routeProps => (
            <NavBarContainer
              {...routeProps}
              authInfo={this.state}
              authHandler={this.authHandler}
              logoutHandler={this.logoutHandler}
            />
          )}
        />
        <Switch>
          <Route path="/courses" component={CoursesContainer} />
          <Route
            path="/"
            render={routeProps => (
              <HomeContainer
                {...routeProps}
                authInfo={this.state}
                authHandler={this.authHandler}
              />
            )}
          />
        </Switch>
        <FooterContainer />
      </div>
    );
  }
}

export default App;
