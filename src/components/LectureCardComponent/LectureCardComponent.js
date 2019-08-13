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
      canWatch: false,

      selectedFile: null,
      selectedFileText: "",
      fileStatus: "",
      fileStatusType: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEnrolled !== this.props.isEnrolled) {
      this.fetchLectureData();
    }
  }

  fetchLectureData = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

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
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value,
      selectedFile: event.target.files[0]
    });
  };

  uploadHandler = () => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", this.state.selectedFile);
    bodyFormData.append("lectureId", this.state.lectureData.id);

    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .post("http://localhost:8080/api/assignments", bodyFormData, config)
      .then(response => {
        console.log(response);
        this.setState({
          fileStatus: "File uploaded successfully",
          fileStatusType: "good"
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          fileStatus: "Couldn't upload file",
          fileStatusType: "bad"
        });
      });
  };

  componentDidMount() {
    this.fetchLectureData();
  }

  toggleVideoModal = () => {
    this.setState({ videoModal: !this.state.videoModal });
  };

  toggleUploadModal = () => {
    this.setState({ uploadModal: !this.state.uploadModal });
  };

  render() {
    let watchButton = (
      <MDBBtn
        color="primary"
        onClick={this.toggleVideoModal}
        disabled={!this.state.canWatch}
      >
        Watch
      </MDBBtn>
    );

    let uploadButton = (
      <MDBBtn
        size="sm"
        gradient="purple"
        onClick={this.toggleUploadModal}
        disabled={!this.state.canWatch || this.props.isFinished}
      >
        Upload Assignment
      </MDBBtn>
    );

    let taskButton = (
      <MDBBtn
        size="sm"
        gradient="purple"
        href={this.props.lecture.task.filePath}
        disabled={!this.state.canWatch || this.props.isFinished}
      >
        View Task
      </MDBBtn>
    );

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

    let statusText;

    if (this.state.fileStatus !== "") {
      statusText = (
        <p
          className={
            this.state.fileStatusType === "bad" ? "red-text" : "green-text"
          }
        >
          {this.state.fileStatus}
        </p>
      );
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
            {uploadButton}
            {taskButton}
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
          toggle={this.toggleUploadModal}
        >
          <MDBModalHeader toggle={this.toggleUploadModal}>
            Upload a file
          </MDBModalHeader>
          <MDBModalBody>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="selectedFileText"
                  onChange={this.fileChangeHandler}
                  accept=".txt,.pdf,.java,.doc,.docx"
                />
                <label className="custom-file-label" htmlFor="selectedFileText">
                  {this.state.selectedFileText}
                </label>
              </div>
            </div>
            {statusText}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="primary"
              onClick={this.uploadHandler}
              disabled={this.state.selectedFile === ""}
            >
              Upload
            </MDBBtn>
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
