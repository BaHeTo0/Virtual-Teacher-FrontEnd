import React, { Component } from "react";
import "./HomeContainer.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer";
import axios from "axios";

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topCourses: null,
      recentCourses: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/courses/top?size=4")
      .then(response => {
        this.setState({ topCourses: response.data.content });
      })
      .catch(error => {
        console.log(error.response);
        alert("Couldn't load top courses");
      });

      axios
      .get("http://localhost:8080/api/courses/recent?size=4")
      .then(response => {
        this.setState({ recentCourses: response.data.content });
      })
      .catch(error => {
        console.log(error.response);
        alert("Couldn't load recent courses");
      });
  }

  render() {
    return (
      <div className="HomeContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8">
              <h2>Homepage</h2>
              <h5>The user is not logged in</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tristique quam in purus eleifend maximus. Nullam sed magna eget
                leo consequat faucibus in vitae magna. Quisque ultricies, enim
                at tempor ornare, lorem orci congue lectus, ut viverra ante
                lectus a quam. Pellentesque elementum luctus risus, vel pulvinar
                magna facilisis at. Vivamus sit amet pretium diam. Suspendisse
                in neque ac orci auctor rutrum.
              </p>
            </MDBCol>
            <MDBCol md="4">
              <img
                src="https://via.placeholder.com/220x180"
                className="rounded float-right"
                alt=""
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Top rated courses</h3>
          <br />
          <CourseCardsContainer courses={this.state.topCourses} key={1}/>
        </MDBContainer>

        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Most Recent courses</h3>
          <br />
          <CourseCardsContainer courses={this.state.recentCourses} key={2}/>
        </MDBContainer>
      </div>
    );
  }
}

export default HomeContainer;
