import React, { Component } from "react";
import "./CourseCardsComponent.css";
import { MDBCol, MDBRow } from "mdbreact";
import CourseCardComponent from "../CourseCardComponent/CourseCardComponent";

class CourseCardsComponent extends Component {
  render() {
    let cards = "No courses here";

    if (this.props.courses !== null && this.props.courses !== []) {
      cards = this.props.courses.map(course => {
        return (
          <MDBCol lg="3" key={course.id}>
            <CourseCardComponent
              authInfo={this.props.authInfo}
              course={course}
              key={course.id}
            />
          </MDBCol>
        );
      });
    }

    return (
      <div className="CourseCardsComponent">
        <MDBRow>{cards}</MDBRow>
      </div>
    );
  }
}

export default CourseCardsComponent;
