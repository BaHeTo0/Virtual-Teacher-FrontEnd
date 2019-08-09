import React from "react"
import { MDBContainer , MDBCol, MDBRow, MDBBtn } from "mdbreact"
import axios from "axios"

class ProfileDetailsComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: props.profile.firstName,
            lastName: props.profile.lastName,
            email: props.profile.email,
            
            changes: {
                firstName: false,
                lastName: false,
                email: false
            }

        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });


        if ((event.target.value !== "") && (event.target.value !== this.props.profile[event.target.id])) {
            this.setState({
                changes: {
                    [event.target.id]: true
                }
            })
        } else {
            this.setState({
                changes: {
                    [event.target.id]: false
                }
            })
        }

    }

    getChanges = () => {
        let changes = {
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            email: this.props.profile.email
        }

        if (this.state.changes.firstName) {
            changes.firstName = this.state.firstName
        }
        if (this.state.changes.lastName) {
            changes.lastName = this.state.lastName
        }
        if (this.state.changes.email) {
            changes.email = this.state.email
        }

        return changes;
    }

    onClick = (event) => {
        let config = {
            headers: {
              Authorization: "Bearer " + this.props.authInfo.authToken
            }
          };

        let changes = this.getChanges();
        console.log(this.props)

        axios
          .put(
            `http://localhost:8080/api/users/${this.props.authInfo.userId}/updateInfo`,
            this.getChanges(),
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
            })
          })
          .catch(error => {
            console.log(error.response);
          });
    }

    render() {

        let saveBtn;

        if (this.state.changes.firstName || this.state.changes.lastName || this.state.changes.email) {
            saveBtn = (<MDBBtn disabled={false} onClick={this.onClick}>Save Changes</MDBBtn>);
        } else {
            saveBtn = (<MDBBtn disabled={true}>Save Changes</MDBBtn>);
        }

        return(
            <MDBCol>
                <MDBRow>
                    <p className="text-left font-weight-bold">Profile Details</p>
                </MDBRow>
                <MDBRow><label>First Name</label></MDBRow>
                <MDBRow><input type="text" id="firstName" placeholder={this.props.profile.firstName}  onChange={this.onChange} /></MDBRow>
                <MDBRow><label>Last Name</label></MDBRow>
                <MDBRow><input id="lastName" placeholder={this.props.profile.lastName} onChange={this.onChange} /></MDBRow>
                <MDBRow><label>Email</label></MDBRow>
                <MDBRow><input id="email" placeholder={this.props.profile.email} onChange={this.onChange} /></MDBRow>
                {saveBtn}
            </MDBCol>
        );
    }

}

export default ProfileDetailsComponent;