import React, { Component } from "react";
import "./CourseCardsContainer.css";
import { MDBCol, MDBRow } from "mdbreact";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";

class CourseCardsContainer extends Component {
  render() {
    let cards = "No courses here";

    if (this.props.courses !== null || this.props.courses !== []) {
      cards = this.props.courses.map(course => {
        return (
          <MDBCol md="3" key={course.id}>
            <CourseCardComponent course={course} key={course.id} />
          </MDBCol>
        );
      });
    }

    return (
      <div className="CourseCardsContainer">
        <MDBRow>{cards}</MDBRow>
      </div>
    );
  }
}

export default CourseCardsContainer;
