import React, { Component } from "react";
import "./CoursesContainer.css";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer";
import { MDBContainer } from "mdbreact";

class CoursesContainer extends Component {
  render() {
    return (
      <div className="CoursesContainer">
        <MDBContainer className="mx-auto my-1">
          <h3>Top courses in Topic 1</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Topic 2</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Topic 3</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Topic 4</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Topic 5</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Topic 6</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
      </div>
    );
  }
}

export default CoursesContainer;
