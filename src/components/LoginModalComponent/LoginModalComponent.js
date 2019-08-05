import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBInput
} from "mdbreact";
import "./LoginModalComponent.css";
import axios from "axios";

class LoginModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formError: {
        email: "",
        password: ""
      },
      badAuth: null
    };
  }

  loginHandler = event => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:8080/api/auth/login", data)
      .then(response => {
        console.log(response);
        this.props.authHandler("authToken", response.data.token);
        this.props.authHandler("userId", response.data.id);
        this.props.authHandler("firstName", response.data.firstName);
        response.data.roles.forEach(element => {
          this.props.authHandler(element.name, true);
        });
        this.setState({ badAuth: false });
      })
      .catch(error => {
        this.setState({ badAuth: true });
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let incorrectPassword = null;
    if (this.state.badAuth) {
      incorrectPassword = (
        <p className="font-weight-bold text-center text-danger">
          Incorrect email/password!
        </p>
      );
    }

    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <MDBModalHeader>Login</MDBModalHeader>
        <MDBModalBody>
          <form onSubmit={this.loginHandler}>
            <div className="grey-text">
              <MDBInput
                label="Email"
                icon="envelope"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
                group
                type="email"
                error="wrong"
                success="right"
                required
                validate
              />
              <MDBInput
                label="Password"
                icon="lock"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
                group
                type="password"
                validate
                required
              />
              {incorrectPassword}
            </div>
            <div className="mt-4" />
            <MDBBtn type="submit">Login</MDBBtn>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default LoginModalComponent;
