import React from "react";
import ProfileCardComponent from "../../components/Profile/ProfileCard/ProfileCardComponent";
import { MDBContainer, MDBCol, MDBRow, MDBBtn,MDBBtnGroup } from "mdbreact";
import ProfileDetailsComponent from "../../components/Profile/ProfileDetails/ProfileDetailsComponent";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer";
import axios from "axios";
import "./ProfilePageContainer.css";

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      rightSideOption: 0
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .get(`http://localhost:8080/api/users/me`, config)
      .then(response => {
        console.log(response.data);
        this.setState({
          profile: response.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onClick = num => () => {
    this.setState({
      rightSideOption: num
    });
  };

  render() {
    let rightSide;

    if (this.state.profile === null) return null;

    switch (this.state.rightSideOption) {
      case 0:
        rightSide = (
          <ProfileDetailsComponent
            profile={this.state.profile}
            authInfo={this.props.authInfo}
          />
        );
        break;
      case 1:
        rightSide = (
          <CourseCardsContainer
            courses={this.state.profile.enrolledCourses}
            authInfo={this.props.authInfo}
          />
        );
        break;
      case 2:
        rightSide = (
          <CourseCardsContainer
            courses={this.state.profile.createdCourses}
            authInfo={this.props.authInfo}
          />
        );
        break;
      default:
        rightSide = (
          <ProfileDetailsComponent
            profile={this.state.profile}
            authInfo={this.props.authInfo}
          />
        );
    }

    return (
      <div className="ProfilePageContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="4">
              <ProfileCardComponent
                profile={this.state.profile}
                authInfo={this.props.authInfo}
              />
              <MDBBtnGroup vertical>
                <MDBBtn
                size="md"
                  onClick={this.onClick(0)}
                  checked={this.state.rightSideOption === 0}
                >
                  Profile Details
                </MDBBtn>
                <MDBBtn
                size="md"
                  onClick={this.onClick(1)}
                  checked={this.state.rightSideOption === 1}
                >
                  Enrolled Courses
                </MDBBtn>
                <MDBBtn
                size="md"
                  onClick={this.onClick(2)}
                  checked={this.state.rightSideOption === 2}
                >
                  Created Courses
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
            <MDBCol lg="8">{rightSide}</MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default ProfilePageContainer;
