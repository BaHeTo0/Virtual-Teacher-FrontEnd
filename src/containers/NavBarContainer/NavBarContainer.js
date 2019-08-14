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
  MDBAlert
} from "mdbreact";

import axios from "axios";
import LoginModalComponent from "../../components/LoginModalComponent/LoginModalComponent";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import RegisterModalComponent from "../../components/RegisterModalComponent/RegisterModalComponent";
import CourseModalComponent from "../../components/CourseModalComponent/CourseModalComponent";
import "./NavBarContainer.css";

class NavBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loginModal: false,
      registerModal: false,
      courseModal: false,
      teacherAlert: false,
      alertMessage: "",
      searchField: ""
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.toggleCourseModal = this.toggleCourseModal.bind(this);
  }

  requestTeacher = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .post("http://localhost:8080/api/teachers/", null, config)
      .then(response => {
        console.log(response);
        this.setState({
          teacherAlert: true,
          alertMessage:
            "You have requested to become a teacher, wait for approval from an admin"
        });
      })
      .catch(error => {
        this.setState({
          teacherAlert: true,
          alertMessage: "You have already requested to become a teacher"
        });
      });
  };

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

  toggleCourseModal = () => {
    this.setState({ courseModal: !this.state.courseModal });
  };

  searchHandler = event => {
    event.preventDefault();
    if (this.state.searchField === "" || this.state.searchField.length < 3)
      return;
    let redirectUrl = "/search/?q=" + this.state.searchField;
    this.props.history.push(redirectUrl);
  };

  onChange = event => {
    this.setState({
      searchField: event.target.value
    });
  };

  render() {
    let authButtons = null;
    let profileButton = null;
    let notificationButton = null;
    let teacherButton = null;
    let teacherAlert = null;
    let newCourseButton = null;
    let adminPanel = null;

    if (this.props.authInfo.authToken === "") {
      authButtons = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn
              outline
              onClick={this.toggleLoginModal}
              size="sm"
              color="white"
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
      notificationButton = (
        <NotificationComponent authInfo={this.props.authInfo} />
      );

      profileButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBDropdown dropleft>
              <MDBDropdownToggle nav caret>
                <strong>{this.props.authInfo.firstName} </strong>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="/profile">
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

    if (
      this.props.authInfo.Student === true &&
      this.props.authInfo.Teacher === "false" &&
      this.props.authInfo.Admin === "false"
    ) {
      teacherButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn
              outline
              onClick={this.requestTeacher}
              size="sm"
              color="white"
            >
              Request Teacher Position
            </MDBBtn>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    if (this.state.teacherAlert) {
      teacherAlert = (
        <MDBAlert color="warning" dismiss>
          {this.state.alertMessage}
        </MDBAlert>
      );
    }

    if (this.props.authInfo.Teacher === true) {
      newCourseButton = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn
              outline
              onClick={this.toggleCourseModal}
              size="sm"
              color="white"
            >
              Add course
            </MDBBtn>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    if (this.props.authInfo.Admin === true) {
      adminPanel = (
        <React.Fragment>
          <MDBNavItem>
            <MDBBtn outline href={"/admin"} size="sm" color="white">
              Admin Panel
            </MDBBtn>
          </MDBNavItem>
        </React.Fragment>
      );
    }

    return (
      <div className="NavBarContainer">
        {teacherAlert}
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
                    <MDBDropdownItem href="#!">Design</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Development</MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Finance&amp;Accounting
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Health&amp;Fitness
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">IT&amp;Software</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBFormInline waves onSubmit={this.searchHandler}>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={this.onChange}
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {adminPanel}
              {newCourseButton}
              {teacherButton}
              {notificationButton}
              {authButtons}
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

        <CourseModalComponent
          isOpen={this.state.courseModal}
          toggleModal={this.toggleCourseModal}
          authHandler={this.props.authHandler}
          authInfo={this.props.authInfo}
        />
      </div>
    );
  }
}

export default NavBarContainer;
