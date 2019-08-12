import React from "react";
import { MDBBtn } from "mdbreact";
import axios from "axios";

class ProfileDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,

      statusMessage: "",
      statusType: "",

      changes: {
        firstName: false,
        lastName: false,
        email: false
      }
    };
  }

  onChange = event => {
    console.log(event.target.id);

    this.setState({
      [event.target.id]: event.target.value
    });

    if (
      event.target.value !== "" &&
      event.target.value !== this.props.profile[event.target.id]
    ) {
      this.setState({
        changes: {
          [event.target.id]: true
        }
      });
    } else {
      this.setState({
        changes: {
          [event.target.id]: false
        }
      });
    }
  };

  onClick = event => {
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

    console.log(this.props);

    axios
      .put(
        `http://localhost:8080/api/users/${
          this.props.authInfo.userId
        }/updateInfo`,
        data,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          profile: {
            picture: response.data.picture,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email
          }
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    let saveBtn;

    if (
      this.state.changes.firstName ||
      this.state.changes.lastName ||
      this.state.changes.email
    ) {
      saveBtn = (
        <MDBBtn disabled={false} onClick={this.onClick}>
          Save Changes
        </MDBBtn>
      );
    } else {
      saveBtn = <MDBBtn disabled={true}>Save Changes</MDBBtn>;
    }

    return (
      <div className="ProfileDetailsComponent">
        <form>
          <p className="h4 text-center mb-4">Profile details</p>
          <label className="grey-text">First Name</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            value={this.state.firstName}
            onChange={this.onChange}
          />
          <br />
          <label className="grey-text">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <br />
          <label className="grey-text">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
          />
          <div className="text-center mt-4">{saveBtn}</div>
        </form>
      </div>
    );
  }
}

export default ProfileDetailsComponent;
