import React, { Component } from "react";
import "./CourseContainer.css";
import { MDBBtn, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import StarRatings from "react-star-ratings";
import ReactMarkDown from "react-markdown";
import { Redirect } from "react-router";
import LectureCardComponent from "../../components/LectureCardComponent/LectureCardComponent";
const removeMd = require("remove-markdown");

class CourseContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: null,
      isEnrolled: false,
      redirect: false
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .get(
        `http://localhost:8080/api/courses/${this.props.match.params.id}`,
        config
      )
      .then(response => {
        this.setState({
          courseData: response.data,
          isEnrolled: response.data.users.some(
            user => user.id == this.props.authInfo.userId
          )
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ redirect: true });
      });
  }

  enrollHandler = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .post(
        `http://localhost:8080/api/courses/enroll?courseId=${
          this.state.courseData.id
        }`,
        null,
        config
      )
      .then(response => {
        this.setState({
          courseData: response.data,
          isEnrolled: response.data.users.some(
            user => user.id == this.props.authInfo.userId
          )
        });
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.message);
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/404" />;
    }
    if (this.state.courseData === null) return null;

    let enrollButton;

    if (!this.state.isEnrolled) {
      enrollButton = <MDBBtn onClick={this.enrollHandler}>Enroll</MDBBtn>;
    }

    return (
      <div className="CourseContainer">
        <MDBRow>
          <MDBCol md="8">
            <h1>{this.state.courseData.name}</h1>
            <StarRatings
              starRatedColor="rgb(255,225,0)"
              rating={this.state.courseData.averageRating}
              starDimension="30px"
              starSpacing="0px"
            />
            <p>{this.state.courseData.topic.name}</p>
            <div className="short-desc-container">
              {removeMd(this.state.courseData.description)}
            </div>
            <br />
            {enrollButton}
            <br />

            <h5>
              Created by{" "}
              {this.state.courseData.author.firstName +
                " " +
                this.state.courseData.author.lastName}
            </h5>
          </MDBCol>
          <MDBCol md="4">
            <img
              src={this.state.courseData.thumbnail.filePath}
              className="rounded img-thumbnail"
              alt=""
            />
          </MDBCol>
        </MDBRow>

        <hr />
        <h1>Description of the course</h1>
        <ReactMarkDown>{this.state.courseData.description}</ReactMarkDown>

        <hr />

        <h1>Lectures</h1>
        <br />
        {this.state.courseData.lectures
          .sort((a, b) => a.id - b.id)
          .map(element => {
            return (
              <React.Fragment key={element.id}>
                <LectureCardComponent
                  authInfo={this.props.authInfo}
                  lecture={element}
                  key={element.id}
                  courseId={this.state.courseData.id}
                />
                <hr width="70%" />
                <br />
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}

export default CourseContainer;
