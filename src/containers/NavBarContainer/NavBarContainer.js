import React, { Component } from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBInput
} from "mdbreact";
import "./NavBarContainer.css";
import axios from "axios";

class NavBarContainer extends Component {
  state = {
    isAuthenticated: false,
    isOpen: false,
    loginModal: false,
    email: "",
    password: ""
  };

  loginHandler = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
    axios
      .post("http://localhost:8080/api/auth/login", data)
      .then(response => {
        this.setState({ isAuthenticated: true });
        this.toggleLoginModal();
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  logoutHandler = () => {
    this.setState({ isAuthenticated: false });
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    this.loginHandler();
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleLoginModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let authButtons = null;

    if (!this.state.isAuthenticated) {
      authButtons = (
        <React.Fragment>
          <MDBNavItem>
            <MDBNavLink onClick={this.toggleLoginModal}>
              <strong>Login</strong>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/register">
              <strong>Register</strong>
            </MDBNavLink>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    let profileButton = null;

    if (this.state.isAuthenticated) {
      profileButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBDropdown dropleft>
              <MDBDropdownToggle nav caret>
                <strong>Krasen </strong>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="#!"><strong>My profile</strong></MDBDropdownItem>
                <MDBDropdownItem onClick={this.logoutHandler}>Log out</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    return (
      <div className="NavBarContainer">
        <MDBNavbar
          color="blue-gradient"
          dark
          expand="md"
          md-selected-nav-item="homeItem"
        >
          <MDBNavbarBrand>
            <strong>Virtual Teacher</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/courses">Courses</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">Topics</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">Business</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Arts</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Development</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Data</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {authButtons}
              {profileButton}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleLoginModal}>
          <MDBModalHeader>Login</MDBModalHeader>
          <MDBModalBody>
            <form
              className="needs-validation"
              onSubmit={this.submitHandler}
              noValidate
            >
              <MDBInput
                value={this.state.email}
                name="email"
                onChange={this.changeHandler}
                type="email"
                id="formEmail"
                label="Email"
                required
              >
                <div className="invalid-feedback">
                  Please provide a valid email
                </div>
              </MDBInput>

              <MDBInput
                value={this.state.password}
                name="password"
                onChange={this.changeHandler}
                type="password"
                id="formPassword"
                label="Password"
                required
              >
                <div className="invalid-feedback">
                  Please provide a valid password
                </div>
              </MDBInput>
              <MDBBtn color="cyan accent-2" onClick={this.toggleLoginModal}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" type="submit">
                Login
              </MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default NavBarContainer;
