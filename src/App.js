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

    this.state = {
      isAuthenticated: null,
      authToken: null,
      userId: null,
      roles: {
        student: null,
        teacher: null,
        admin: null
      }
    };
  }

  authHandler = (fieldName, value) => {
    this.setState({ [fieldName]: [value] });
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
