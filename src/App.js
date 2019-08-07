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
import axios from "axios";
import LoginBodyComponent from "./components/LoginBodyComponent/LoginBodyComponent";
import PrivateRoute from "./PrivateRoute";

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

  componentDidMount() {
    if (this.state.authToken !== "") {
      let config = {
        headers: {
          Authorization: "Bearer " + this.state.authToken
        }
      };

      console.log(this.state.authToken);

      axios
        .post("http://localhost:8080/api/auth/validate", null, config)
        .then(response => {
          console.log(response);
          this.authHandler("authToken", response.data.token);
          this.authHandler("userId", response.data.id);
          this.authHandler("firstName", response.data.firstName);
          response.data.roles.forEach(element => {
            this.authHandler(element.name, true);
          });
        })
        .catch(error => {
          console.log(error.response);
          this.logoutHandler();
        });
    }
  }

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
          <Route path="/login" component={LoginBodyComponent} />
          <PrivateRoute path="/course" authInfo={this.state}/>
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
