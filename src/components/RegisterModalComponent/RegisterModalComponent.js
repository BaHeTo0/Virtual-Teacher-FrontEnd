import React, { Component } from "react";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBRow,
  MDBCol
} from "mdbreact";
import "./RegisterModalComponent.css";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import DateTimeFormat from "dateformat";

const nameRegex = RegExp("^[a-zA-Z]{3,15}$");
const emailRegex = RegExp(
  "^([_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{1,6}))?$"
);
const passwordRegex = RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$");

class RegisterModalComponent extends Component {
  constructor(props) {
    super(props);

    this.dateChangeHandler = this.dateChangeHandler.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      selectedDay: undefined,
      formErrors: {
        firstName: " ",
        lastName: " ",
        email: " ",
        password: " ",
        selectedDay: " "
      },
      registerError: ""
    };
  }

  registerHandler = event => {
    event.preventDefault();

    if (!this.formaValid(this.state.formErrors)) {
      this.setState({ registerError: "Some fields contain errors!" });
      return;
    }

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      birthDate: DateTimeFormat(this.state.selectedDay, "yyyy-mm-dd")
    };
    axios
      .post("http://localhost:8080/api/auth/register", data)
      .then(response => {
        console.log(response);
        this.props.authHandler("authToken", response.data.token);
        this.props.authHandler("userId", response.data.id);
        this.props.authHandler("firstName", response.data.firstName);
        response.data.roles.forEach(element => {
          this.props.authHandler(element.name, true);
        });
        this.props.toggleModal();
      })
      .catch(error => {
        this.setState({ registerError: error.response.data.message });
      });
  };

  changeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          nameRegex.test(value) && value.length > 0
            ? ""
            : "Name should contain a-z and be 3-15 symbols long";
        break;
      case "lastName":
        formErrors.lastName =
          nameRegex.test(value) && value.length > 0
            ? ""
            : "Name should contain a-z and be 3-15 symbols long";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Enter a valid email";
        break;
      case "password":
        formErrors.password =
          passwordRegex.test(value) && value.length > 0
            ? ""
            : "Minimum eight characters, at least one letter and one number";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  dateChangeHandler(selectedDay) {
    let formErrors = this.state.formErrors;

    formErrors.selectedDay =
      selectedDay === undefined ? "Select a valid date" : "";

    this.setState({ formErrors, selectedDay });
  }

  formaValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(error => {
      if (error.length > 0) valid = false;
    });
    return valid;
  };

  render() {
    const { selectedDay } = this.state;

    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <MDBModalHeader>Register</MDBModalHeader>
        <MDBModalBody>
          <form
            className="needs-validation"
            noValidate
            onSubmit={this.registerHandler}
          >
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.firstName.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.firstName}
            </div>
            <br />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.lastName.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.lastName}
            </div>
            <br />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.email.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.email}
            </div>
            <br />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
              className={
                this.state.formErrors.password.length > 1
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
            <div className="invalid-feedback">
              {this.state.formErrors.password}
            </div>
            <br />
            <label htmlFor="defaultFormRegisterPasswordEx">Birth Date</label>
            <DayPickerInput
              value={selectedDay}
              onDayChange={this.dateChangeHandler}
              dayPickerProps={{
                selectedDays: selectedDay
              }}
            />
            <div className="invalid-date">
              {this.state.formErrors.selectedDay}
            </div>

            <div className="mt-4" />

            <MDBRow>
              <MDBCol md="4">
                <MDBBtn type="submit">Register</MDBBtn>
              </MDBCol>
              <MDBCol
                md="8"
                className="register-error"
                style={{
                  display:
                    this.state.registerError.length > 1 ? "block" : "hidden"
                }}
              >
                {this.state.registerError}
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default RegisterModalComponent;
