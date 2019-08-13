import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBRow,
  MDBCol
} from "mdbreact";
import "./LectureModalComponent.css";
import axios from "axios";

class LectureModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lectureName: "",
      lectureDescription: "",
      videoPath: "",
      videoFile: null,
      taskPath: "",
      taskFile: null,

      formErrors: {
        lectureName: " ",
        lectureDescription: " ",
        videoPath: " ",
        taskPath: " "
      },
      error: ""
    };
  }

  formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(error => {
      if (error.length > 0) valid = false;
    });
    return valid;
  };

  changeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let formErrors = this.state.formErrors;

    console.log(value);

    switch (name) {
      case "lectureName":
        formErrors.lectureName =
          value.length >= 3 && value.length <= 25
            ? ""
            : "Name should be 3-25 symbols long";
        break;
      case "lectureDescription":
        formErrors.lectureDescription =
          value.length >= 10 && value.length <= 3000
            ? ""
            : "Description should be 3-3000 symbols long";
        break;
      case "videoPath":
        formErrors.videoPath = value.length > 1 ? "" : "Add a video file";
        this.setState({ videoFile: event.target.files[0] });
        break;
      case "taskPath":
        formErrors.taskPath = value.length > 1 ? "" : "Add a task file";
        this.setState({ taskFile: event.target.files[0] });
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  addLectureHandler = event => {
    event.preventDefault();

    console.log(this.state);

    if (!this.formValid(this.state.formErrors)) {
      this.setState({ error: "Some fields contain errors!" });
      return;
    }

    let formData = new FormData();
    formData.append("name", this.state.lectureName);
    formData.append("description", this.state.lectureDescription);
    formData.append("courseId", this.props.courseId);
    formData.append("videoFile", this.state.videoFile);
    formData.append("taskFile", this.state.taskFile);

    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .post("http://localhost:8080/api/lectures", formData, config)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        if(error.response.data.message!== undefined)
        {
          this.setState({error: error.response.data.message});
        }
      });
  };

  render() {
    return (
      <div className="LectureModalComponent">
        <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
          <MDBModalHeader>New Lecture</MDBModalHeader>
          <MDBModalBody>
            <form
              className="needs-validation"
              noValidate
              onSubmit={this.addLectureHandler}
            >
              <label>Lecture Name</label>
              <input
                type="text"
                name="lectureName"
                value={this.state.lectureName}
                onChange={this.changeHandler}
                className={
                  this.state.formErrors.lectureName.length > 1
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <div className="invalid-feedback">
                {this.state.formErrors.lectureName}
              </div>
              <br />

              <label>Description (markdown format supported)</label>
              <textarea
                rows="10"
                type="text"
                name="lectureDescription"
                value={this.state.lectureDescription}
                onChange={this.changeHandler}
                className={
                  this.state.formErrors.lectureDescription.length > 1
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <div className="invalid-feedback">
                {this.state.formErrors.lectureDescription}
              </div>
              <br />
              <label>Lecture Video</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="videoPath"
                  onChange={this.changeHandler}
                  accept=".mp4,.avi"
                />
                <label className="custom-file-label" htmlFor="videoPath">
                  {this.state.videoPath}
                </label>
              </div>

              <label>Lecture Task</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="taskPath"
                  onChange={this.changeHandler}
                  accept=".txt,.docx,.doc,.java,.pdf"
                />
                <label className="custom-file-label" htmlFor="taskPath">
                  {this.state.taskPath}
                </label>
              </div>

              <div className="mt-4" />
              <MDBRow>
                <MDBCol md="4">
                  <MDBBtn color="primary" type="submit">
                    Submit
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  md="8"
                  className="register-error"
                  style={{
                    display: this.state.error.length > 1 ? "block" : "hidden"
                  }}
                >
                  {this.state.error}
                </MDBCol>
              </MDBRow>
            </form>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default LectureModalComponent;
