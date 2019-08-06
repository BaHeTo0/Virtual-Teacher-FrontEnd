import React, { Component } from "react";
import "./CourseCardComponent.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";

import ReactMarkDown from "react-markdown";

class CourseCardComponent extends Component {
  render() {
    let card = null;

    if (this.props.course !== null) {
      card = (
        <MDBCard>
          <MDBCardImage
            className="img-fluid"
            src={this.props.course.thumbnail.filePath}
            waves
          />
          {/* <p className="font-weight-light">Topic Rating</p> */}
          <MDBCardBody>
            <MDBCardTitle>{this.props.course.name}</MDBCardTitle>
            <MDBCardText>
              <ReactMarkDown source={this.props.course.description} />
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      );
    }

    return <div className="CourseCardComponent">{card}</div>;
  }
}

export default CourseCardComponent;
