import React from "react";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import defaultImage from "../../../images/default_profile.jpg";

class ProfileCardComponent extends React.Component {
  render() {

    let role = "Student";
    if (this.props.authInfo.Teacher) {
      role = "Teacher";
    }
    if (this.props.authInfo.Admin) {
      role = "Admin";
    }

    return (
      <MDBCol>
        <MDBContainer>
          <MDBRow>
            <img
              src={
                this.props.profile.picture !== null
                  ? this.props.profile.picture.filePath
                  : defaultImage
              }
              className="rounded"
              height="128"
              width="128"
              alt=""
            />
          </MDBRow>
          <MDBRow>
            <h6>
              {role}
            </h6>
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    );
  }
}

export default ProfileCardComponent;
