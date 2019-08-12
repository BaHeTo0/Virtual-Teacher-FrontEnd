import React from "react";
import { MDBBtn } from "mdbreact";
import axios from "axios";

const nameRegex = RegExp("^[a-zA-Z]{3,15}$");
const emailRegex = RegExp(
  "^([_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{1,6}))?$"
);
const passwordRegex = RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$");

class ProfileDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,

      statusMessage: "",
      statusType: "",

      formErrors: {
        firstName: "",
        lastName: "",
        email: ""
      },

      changes: {
        firstName: false,
        lastName: false,
        email: false
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

  onChange = event => {
    let formErrors = this.state.formErrors;

    const { name, value } = event.target;
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

    if (
      event.target.value !== "" &&
      event.target.value !== this.props.profile[event.target.name]
    ) {
      this.setState({
        changes: {
          [event.target.name]: true
        }
      });
    } else {
      this.setState({
        changes: {
          [event.target.name]: false
        }
      });
    }
  };

  onClick = () => {
    if (!this.formValid(this.state.formErrors)) {
      this.setState({
        statusMessage: "Some fields contain errors!",
        statusType: "bad"
      });
      return;
    }

    const config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };

    axios
      .put(
        `http://localhost:8080/api/users/${
          this.props.authInfo.userId
        }/updateInfo`,
        data,
        config
      )
      .then(response => {
        if (this.state.changes.email) {
          this.props.logoutHandler();
        } else {
          this.setState({
            profile: {
              picture: response.data.picture,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email
            },
            changes: {
              firstName: false,
              lastName: false,
              email: false
            },
            statusMessage: "Changes saved successfully",
            statusType: "good"
          });
          this.props.authHandler("firstName", response.data.firstName);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          statusMessage: `Couldn't save changes: ${
            error.response.data.message
          }`,
          statusType: "bad"
        });
      });
  };

  render() {
    let saveBtn;

    if (
      (this.state.changes.firstName ||
        this.state.changes.lastName ||
        this.state.changes.email) &&
      this.formValid(this.state.formErrors)
    ) {
      saveBtn = (
        <MDBBtn disabled={false} onClick={this.onClick}>
          Save Changes
        </MDBBtn>
      );
    } else {
      saveBtn = <MDBBtn disabled={true}>Save Changes</MDBBtn>;
    }

    let statusMessage;

    if (this.state.statusMessage.length > 0) {
      statusMessage = (
        <div
          className={
            this.state.statusType === "bad"
              ? "text-center red-text"
              : "text-center green-text"
          }
        >
          {this.state.statusMessage}
        </div>
      );
    }

    return (
      <div className="ProfileDetailsComponent">
        <form>
          <p className="h4 text-center mb-4">Profile details</p>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
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
            onChange={this.onChange}
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
            onChange={this.onChange}
            className={
              this.state.formErrors.email.length > 1
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div className="invalid-feedback">{this.state.formErrors.email}</div>
          <div className="text-center mt-4">{saveBtn}</div>
          {statusMessage}
        </form>
      </div>
    );
  }
}

export default ProfileDetailsComponent;
