import React, { Component } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./LectureCardComponent.css";
import VideoThumbnail from "react-video-thumbnail";
import axios from "axios";

class LectureCardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLectureData: null
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .get(
        `http://localhost:8080/api/lectures/`,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({ courseData: response.data });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ redirect: true });
      });
  }

  render() {
    return (
      <div className="LectureCardComponent">
        <MDBRow>
          <MDBCol md="4">
            <VideoThumbnail videoUrl="http://localhost:8080/api/videos/1" />
          </MDBCol>
          <MDBCol md="6">
            <h3>{this.props.lecture.name}</h3>

            <div className="lecture-description">
              {this.props.lecture.description}
            </div>
          </MDBCol>
          <MDBCol md="2">
            <div className="align-baseline">
              <MDBBtn className="align-middle">Watch</MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default LectureCardComponent;
