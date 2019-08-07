import React, { Component } from "react";
import "./CourseCardComponent.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";

const removeMd = require("remove-markdown");

class CourseCardComponent extends Component {
  render() {
    let card = null;

    if (this.props.course !== null) {
      card = (
        <MDBCard>
          <MDBCardImage
            className="img-fluid"
            src={this.props.course.thumbnail.filePath}
            waves={false}
          />
          {/* <p className="font-weight-light">Topic Rating</p> */}
          <MDBCardBody>
            <MDBCardTitle>{this.props.course.name}</MDBCardTitle>
            <MDBCardText>
              {removeMd(this.props.course.description)}
            </MDBCardText>
            <MDBCardText className="bottom-right">
              <a href="/course/1">Go to course -></a>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      );
    }

    return <div className="CourseCardComponent">{card}</div>;
  }
}

export default CourseCardComponent;
