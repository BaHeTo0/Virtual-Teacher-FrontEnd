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
import LoginBodyComponent from "../LoginBodyComponent/LoginBodyComponent";

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
        this.props.toggleModal();
      })
      .catch(error => {
        this.setState({ badAuth: true });
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    
    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <MDBModalHeader>Login</MDBModalHeader>
        <MDBModalBody>
          <LoginBodyComponent authInfo={this.props.authInfo} authHandler={this.props.authHandler}/>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default LoginModalComponent;
