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
} from "mdbreact";
import "./NavBarContainer.css";
import LoginModalComponent from "../../components/LoginModalComponent/LoginModalComponent";

class NavBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loginModal: false,
    };
    
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleLoginModal = () => {
    this.setState({
      loginModal: !this.state.loginModal
    });
  };

  render() {
    let authButtons = null;

    if (!this.props.authInfo.isAuthenticated) {
      authButtons = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn
              outline
              onClick={this.toggleLoginModal}
              color="white"
              size="sm"
            >
              Login
            </MDBBtn>
          </MDBNavItem>
          <MDBNavItem>
            <MDBBtn size="sm">Register</MDBBtn>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    let profileButton = null;

    if (this.props.authInfo.isAuthenticated) {
      profileButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBDropdown dropleft>
              <MDBDropdownToggle nav caret>
                <strong>Krasen </strong>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="#!">
                  <strong>My profile</strong>
                </MDBDropdownItem>
                <MDBDropdownItem onClick={this.logoutHandler}>
                  Log out
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    return (
      console.log(this.props),
      (
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
                  <MDBNavLink to="/">
                    Home {this.props.authInfo.authToken}
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem
                  active={this.props.location.pathname === "/courses"}
                >
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

          <LoginModalComponent isOpen={this.state.loginModal} toggleLoginModal={this.toggleLoginModal}/>
        </div>
      )
    );
  }
}

export default NavBarContainer;
