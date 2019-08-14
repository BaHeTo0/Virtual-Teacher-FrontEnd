import React, { Component } from "react";
import "./CourseContainer.css";
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
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

      currentUser: null,
      starRating: 0,
      userRating: null,
      isModalOpen: true,

      isEnrolled: false,
      isFinished: false,

      redirect: false,
      openModalOnce: false
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
            user => user.id === parseFloat(this.props.authInfo.userId)
          ),
          isFinished: response.data.graduatedUsers.some(
            user => user.id === parseFloat(this.props.authInfo.userId)
          )
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ redirect: true });
      });

    axios
      .get("http://localhost:8080/api/users/me", config)
      .then(response => {
        this.setState({ currentUser: response.data });
      })
      .catch(error => {
        console.log(error.response);
      });

    axios
      .get(
        `http://localhost:8080/api/courses/my-rating?course-id=${
          this.props.match.params.id
        }`,
        config
      )
      .then(response => {
        console.log(response);
        this.setState({ userRating: response.data.rating });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  toggleModal = () => {
    this.setState({ isModalOpen: this.state.isModalOpen, openModalOnce: true });
  };

  changeRating = newRating => {
    this.setState({
      starRating: newRating
    });
  };

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
            user => user.id === parseFloat(this.props.authInfo.userId)
          )
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  rateHandler = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .put(
        `http://localhost:8080/api/courses/rate-course?course-id=${
          this.props.match.params.id
        }&rating=${this.state.starRating}`,
        null,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({ courseData: response.data, isModalOpen: false });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/404" />;
    }
    if (this.state.courseData === null) return null;

    let enrollButton;

    if (!this.state.isEnrolled && !this.state.isFinished) {
      enrollButton = <MDBBtn onClick={this.enrollHandler}>Enroll</MDBBtn>;
    }

    let rateModal;

    if (
      !this.state.openModalOnce &&
      this.state.userRating === null &&
      this.state.isFinished
    ) {
      rateModal = (
        <MDBModal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <MDBModalHeader>Rate course</MDBModalHeader>
          <MDBModalBody>
            <h3>Enjoyed this course? Rate it!</h3>
            <StarRatings
              rating={this.state.starRating}
              starRatedColor="rgb(255,165,52)"
              starHoverColor="rgb(255,69,69)"
              changeRating={this.changeRating}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="0px"
            />
            <br />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={this.rateHandler}
              disabled={this.state.starRating === 0}
            >
              Rate
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.toggleModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      );
    }

    return (
      <div className="CourseContainer">
        <MDBRow>
          <MDBCol md="8">
            <h1>{this.state.courseData.name}</h1>
            <p>{this.state.courseData.topic.name}</p>
            <StarRatings
              starRatedColor="rgb(255,225,0)"
              rating={this.state.courseData.averageRating}
              starDimension="30px"
              starSpacing="0px"
            />
            <br />({this.state.courseData.totalVotes} votes)
            <br />
            <br />
            <div className="short-desc-container">
              {removeMd(this.state.courseData.description)}
            </div>
            {enrollButton}
          </MDBCol>
          <MDBCol md="4">
            <img
              src={this.state.courseData.thumbnail.filePath}
              className="rounded img-thumbnail"
              alt=""
            />
            <h6>
              Created by{" "}
              {this.state.courseData.author.firstName +
                " " +
                this.state.courseData.author.lastName}
            </h6>
          </MDBCol>
        </MDBRow>

        <hr />
        <h1>Description of the course</h1>
        <ReactMarkDown
          source={this.state.courseData.description}
          escapeHtml={false}
        />
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
                  isEnrolled={this.state.isEnrolled}
                  isFinished={this.state.isFinished}
                />
                <hr width="70%" />
                <br />
              </React.Fragment>
            );
          })}

        {rateModal}
      </div>
    );
  }
}

export default CourseContainer;
