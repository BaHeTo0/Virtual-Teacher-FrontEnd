import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import "./LectureCardComponent.css";
import VideoThumbnail from "react-video-thumbnail";
import ReactPlayer from "react-player";
import axios from "axios";

class LectureCardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lectureData: null,

      assignment: null,

      videoModal: false,
      uploadModal: false,
      canWatch: false
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    console.log(this.props.courseId);

    axios
      .get(
        `http://localhost:8080/api/lectures/${this.props.courseId}/${
          this.props.lecture.innerId
        }`,
        config
      )
      .then(response => {
        this.setState({ lectureData: response.data, canWatch: true });
      })
      .catch(error => {
        console.log(error.response);
      });

    config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      },
      params: {
        lectureId: this.props.lecture.id
      }
    };

    axios
      .get("http://localhost:8080/api/assignments", config)
      .then(response => {
        this.setState({ assignment: response.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  toggleVideoModal = () => {
    this.setState({ videoModal: !this.state.videoModal });
  };

  toggleUploadModal = () => {
    this.setState({ uploadModal: !this.state.uploadModal });
  };

  render() {
    let watchButton;

    if (this.state.canWatch) {
      watchButton = (
        <MDBBtn color="primary" onClick={this.toggleVideoModal}>
          Watch
        </MDBBtn>
      );
    }

    let gradeText;

    if (this.state.assignment !== null) {
      if (this.state.assignment.grade === 0) {
        gradeText = (
          <React.Fragment>
            <p>Assignment not graded yet</p>
          </React.Fragment>
        );
      } else {
        gradeText = (
          <React.Fragment>
            <h1 className="font-weight-bolder deep-orange-text">
              {this.state.assignment.grade}
            </h1>
            <p className="font-weight-light deep-orange-text">grade</p>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="LectureCardComponent">
        <MDBRow>
          <MDBCol md="4">
            <VideoThumbnail videoUrl={this.props.lecture.video.filePath} />
          </MDBCol>
          <MDBCol md="6">
            <h3>{this.props.lecture.name}</h3>

            <div className="lecture-description">
              {this.props.lecture.description}
            </div>
            <MDBBtn
              size="sm"
              gradient="purple"
              onClick={this.toggleUploadModal}
            >
              Upload Assignment
            </MDBBtn>
            <MDBBtn
              size="sm"
              gradient="purple"
              href={this.props.lecture.task.filePath}
            >
              View Task
            </MDBBtn>
          </MDBCol>
          <MDBCol md="2" style={{ textAlign: "center" }}>
            {watchButton}
            {gradeText}
          </MDBCol>
        </MDBRow>

        <MDBModal
          isOpen={this.state.videoModal}
          toggle={this.toggleVideoModal}
          size="lg"
        >
          <MDBModalHeader toggle={this.toggleVideoModal}>
            {this.props.lecture.name}
          </MDBModalHeader>
          <MDBModalBody>
            <ReactPlayer
              url={this.props.lecture.video.filePath}
              controls
              width="100%"
            />
            <hr />
            <h5>Lecture description</h5>
            <p style={{ marginTop: "10px" }}>
              {this.props.lecture.description}
            </p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleVideoModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <MDBModal
          isOpen={this.state.uploadModal}
          toggle={this.uploadModal}
          size="lg"
        >
          <MDBModalHeader toggle={this.toggleUploadModal}>
            {this.props.lecture.name}
          </MDBModalHeader>
          <MDBModalBody />
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleUploadModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default LectureCardComponent;
