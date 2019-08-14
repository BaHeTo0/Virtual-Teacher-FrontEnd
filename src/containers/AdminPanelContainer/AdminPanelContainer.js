import React from "react";
import { Redirect } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBBtnGroup } from "mdbreact";
import TeacherRequestsComponent from "../../components/TeacherRequestsComponent/TeacherRequestsComponent";
import UserManagerComponent from "../../components/UserManagerComponent/UserManagerComponent";
import "./AdminPanelContainer.css";

class AdminPanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherRequests: [],
      users: [],
      rightSideOption: 0,
      profile: null
    };
  }

  onClick = num => () => {
    this.setState({
      rightSideOption: num
    });
  };

  render() {
    if (this.props.authInfo.Admin !== true) {
      return <Redirect to="/404" />;
    }

    let rightSide = null;

    switch (this.state.rightSideOption) {
      case 0:
        rightSide = (
          <TeacherRequestsComponent
            profile={this.state.profile}
            authInfo={this.props.authInfo}
            authHandler={this.props.authHandler}
            logoutHandler={this.props.logoutHandler}
          />
        );
        break;
      case 1:
        rightSide = (
          <UserManagerComponent
            profile={this.state.profile}
            authInfo={this.props.authInfo}
            authHandler={this.props.authHandler}
            logoutHandler={this.props.logoutHandler}
          />
        );
        break;
      default:
        rightSide = (
          <TeacherRequestsComponent
            profile={this.state.profile}
            authInfo={this.props.authInfo}
            authHandler={this.props.authHandler}
            logoutHandler={this.props.logoutHandler}
          />
        );
    }

    return (
      <div className="AdminPanelContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="2">
              <h3>Manage: </h3>
              <hr />
              <MDBBtnGroup vertical>
                <MDBBtn
                  size="md"
                  onClick={this.onClick(0)}
                  checked={this.state.rightSideOption === 0}
                >
                  Teacher Requests
                </MDBBtn>
                <MDBBtn
                  size="md"
                  onClick={this.onClick(1)}
                  checked={this.state.rightSideOption === 1}
                >
                  All Users
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
            <MDBCol lg="10">{rightSide}</MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default AdminPanelContainer;
