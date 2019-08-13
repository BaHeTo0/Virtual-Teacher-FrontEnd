import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBInput,
  MDBRow,
  MDBCol
} from "mdbreact";
import "./CourseModalComponent.css";
import axios from "axios";

class CourseModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseName: "",
      courseDescription: "",
      fileName: "",
      file: null,

      error: "",

      formErrors: {
        courseName: "",
        courseDescription: "",
        fileName: ""
      }
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

    switch (name) {
      case "courseName":
        formErrors.courseName =
          value.length >= 3 && value.length <= 25
            ? ""
            : "Name should be 3-25 symbols long";
        break;
      case "courseDescription":
        formErrors.courseDescription =
          value.length >= 3 && value.length <= 3000
            ? ""
            : "Description should be 3-3000 symbols long";
        break;
      case "fileName":
        formErrors.fileName = value.length > 1 ? "" : "Add a thumbnail file";
        this.setState({ file: event.target.files[0] });
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  render() {
    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <MDBModalHeader>New Course</MDBModalHeader>
        <MDBModalBody>
          <form
            className="needs-validation"
            noValidate
            onSubmit={this.registerHandler}
          >
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={this.state.courseName}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.courseName.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.courseName}
            </div>
            <br />

            <label>Topic</label>
            <select className="browser-default custom-select">
              <option value="1" defaultValue>
                Business
              </option>
              <option value="2">Design</option>
              <option value="3">Development</option>
              <option value="4">Finance&amp;Accounting</option>
              <option value="5">Health&amp;Fitness</option>
              <option value="6">IT&amp;Software</option>
            </select>
            <br />
            <br />

            <label>Description (markdown format supported)</label>
            <textarea
              rows="10"
              type="text"
              name="courseDescription"
              value={this.state.courseDescription}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.courseDescription.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.courseDescription}
            </div>
            <br />
            <label>Course Thumbnail</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="fileName"
                onChange={this.changeHandler}
                accept=".jpg"
              />
              <label className="custom-file-label" htmlFor="fileName">
                {this.state.fileName}
              </label>
            </div>

            <div className="mt-4" />
            <MDBRow>
              <MDBCol md="4">
                <MDBBtn color="primary" type="submit">
                  Register
                </MDBBtn>
              </MDBCol>
              <MDBCol
                md="8"
                className="register-error"
                style={{
                  display:
                    this.state.error.length > 1 ? "block" : "hidden"
                }}
              >
                {this.state.error}
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default CourseModalComponent;
