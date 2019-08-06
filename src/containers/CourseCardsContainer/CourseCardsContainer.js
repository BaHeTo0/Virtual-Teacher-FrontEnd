import React, { Component } from "react";
import "./CourseCardsContainer.css";
import { MDBCol, MDBRow } from "mdbreact";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";
import { element } from "prop-types";

class CourseCardsContainer extends Component {
  render() {
    let cards = "";

    if (this.props.courses !== null) {
      console.log(this.props.courses);

      cards = this.props.courses.map(course => {
        console.log(course);
        return (
          <MDBCol md="3">
            <CourseCardComponent course={course} />
          </MDBCol>
        );
      });
    }

    return (
      <div className="CourseCardsContainer">
        <MDBRow>
          {cards}

          {/* <MDBCol md="3">
            <CourseCardComponent />
          </MDBCol>
          <MDBCol md="3">
            <CourseCardComponent />
          </MDBCol>
          <MDBCol md="3">
            <CourseCardComponent />
          </MDBCol>
          <MDBCol md="3">
            <CourseCardComponent />
          </MDBCol> */}
        </MDBRow>
      </div>
    );
  }
}

export default CourseCardsContainer;
