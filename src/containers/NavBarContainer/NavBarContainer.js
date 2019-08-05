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
  MDBDropdownItem
} from "mdbreact";

import "./NavBarContainer.css";
import LoginModalComponent from "../../components/LoginModalComponent/LoginModalComponent";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent"
import RegisterModalComponent from "../../components/RegisterModalComponent/RegisterModalComponent";


class NavBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loginModal: false,
      registerModal: false
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleLoginModal = () => {
    this.setState({ loginModal: !this.state.loginModal });
  };

  toggleRegisterModal = () => {
    this.setState({
      registerModal: !this.state.registerModal
    });
  };

  render() {
    let authButtons = null;
    let profileButton = null;
    let notificationButton = null;

    if (this.props.authInfo.authToken === "") {
      authButtons = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn
              outline
              onClick={this.toggleLoginModal}
              size="sm"
            >
              Login
            </MDBBtn>
          </MDBNavItem>
          <MDBNavItem>
            <MDBBtn onClick={this.toggleRegisterModal} size="sm">
              Register
            </MDBBtn>
          </MDBNavItem>
        </React.Fragment>
      );
    } else {
      notificationButton = <NotificationComponent />

      profileButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBDropdown dropleft>
              <MDBDropdownToggle nav caret>
                <strong>{this.props.authInfo.firstName} </strong>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="#!">
                  <strong>My profile</strong>
                </MDBDropdownItem>
                <MDBDropdownItem onClick={this.props.logoutHandler}>
                  Log out
                </MDBDropdownItem>
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
              <MDBNavItem active={this.props.location.pathname === "/"}>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active={this.props.location.pathname === "/courses"}>
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
              {notificationButton}
              {profileButton}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

        <LoginModalComponent
          isOpen={this.state.loginModal}
          toggleModal={this.toggleLoginModal}
          authHandler={this.props.authHandler}
        />

        <RegisterModalComponent
          isOpen={this.state.registerModal}
          toggleModal={this.toggleRegisterModal}
          authHandler={this.props.authHandler}
        />
      </div>
    );
  }
}

export default NavBarContainer;
