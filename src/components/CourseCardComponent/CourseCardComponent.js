import React, { Component } from "react";
import "./CourseCardComponent.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from "mdbreact";
import {Link} from 'react-router-dom';

const removeMd = require("remove-markdown");

class CourseCardComponent extends Component {
  render() {
    let card = null;

    let cardLink = null;

    if (this.props.authInfo.authToken.length > 1)
      cardLink = (
        <MDBCardText className="bottom-right">
          <Link to={"/course/" + this.props.course.id}>Go to course -></Link>
        </MDBCardText>
      );

    if (this.props.course !== null) {
      card = (
        <MDBCard>
          <MDBCardImage
            className="img-fluid"
            src={this.props.course.thumbnail.filePath}
            waves={false}
          />

          <MDBCardBody>
            <MDBCardTitle>{this.props.course.name}</MDBCardTitle>
            <MDBCardText>{removeMd(this.props.course.description)}</MDBCardText>
            {cardLink}
          </MDBCardBody>
        </MDBCard>
      );
    }

    return <div className="CourseCardComponent">{card}</div>;
  }
}

export default CourseCardComponent;
