import React, { Component } from "react";
import "./CoursesContainer.css";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer";
import { MDBContainer } from "mdbreact";
import axios from "axios";

class CoursesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses1: null,
      courses2: null,
      courses3: null,
      courses4: null,
      courses5: null,
      courses6: null
    };
  }

  componentDidMount() {
    Object.keys(this.state).forEach((key, index) => {
      axios
        .get(`http://localhost:8080/api/courses/topic/${index + 1}?size=4`)
        .then(response => {
          this.setState({ [key]: response.data.content });
        })
        .catch(error => {
          console.log(error.response);
          alert("Couldn't load courses");
        });
    });
  }

  render() {
    return (
      <div className="CoursesContainer">
        <MDBContainer className="mx-auto my-1">
          <h3>Top courses in Business</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses1}
          />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Design</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses2}
          />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Development</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses3}
          />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Finance&amp;Accounting</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses4}
          />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in Health&amp;Fitness</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses5}
          />
        </MDBContainer>
        <MDBContainer className="mx-auto my-1">
          <br />
          <hr />
          <h3>Top courses in IT&amp;Software</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.courses6}
          />
        </MDBContainer>
      </div>
    );
  }
}

export default CoursesContainer;
