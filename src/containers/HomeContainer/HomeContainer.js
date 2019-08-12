import React, { Component } from "react";
import "./HomeContainer.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CourseCardsContainer from "../../components/CourseCardsComponent/CourseCardsComponent";
import axios from "axios";
import openbook from "../../images/open-book.png";

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
      });
  }

  render() {
    return (
      <div className="HomeContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="8">
              <h2>Welcome to Virtual Teacher</h2>
              <h5 className="text-info">
                Online risk-free educational platform
              </h5>
              <p>
                The world's newest selection of courses. Chose from over at
                least 6 categories of topics and get your education points
                boosted through the roof. Your friends will be amazed by your
                new skills and the best part is that, new courses are being
                uploaded every now and then so there wil always be something new
                for you to learn.
              </p>
              <p>
                Wait? Did you just mention that you have a unique skill that is
                facing extinction? Well we've got just the solution for you.
                Just apply for a teacher and you will be able to upload video
                courses to teach the world your skills as well!
              </p>
            </MDBCol>
            <MDBCol lg="4">
              <img src={openbook} className="rounded" alt="" />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Top rated courses</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.topCourses}
          />
        </MDBContainer>

        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Most Recent courses</h3>
          <br />
          <CourseCardsContainer
            authInfo={this.props.authInfo}
            courses={this.state.recentCourses}
          />
        </MDBContainer>
      </div>
    );
  }
}

export default HomeContainer;
