import React, { Component } from "react";
import axios from "axios";
import { MDBRow, MDBCol } from "mdbreact";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";
import "./CourseTopicContainer.css";

class CourseTopicContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicId: this.props.match.params.id,
      pageCount: 1,
      activePage: 1,
      results: [],
      topics: [
        "Business",
        "Design",
        "Development",
        "Finance&Accounting",
        "Health&Fitness",
        "IT&Software"
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ topicId: nextProps.match.params.id }, () =>
      this.selectPage(1)
    );
  }

  componentDidMount() {
    this.selectPage(1);
  }

  selectPage = pageNum => {
    this.setState({ activePage: pageNum });

    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .get(
        `http://localhost:8080/api/courses/topic/${
          this.state.topicId
        }?size=8&page=${pageNum - 1}`,
        config
      )
      .then(response => {
        console.log(response);
        this.setState({
          results: response.data.content,
          activePage: pageNum,
          pageCount: response.data.totalPages
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    let paginationComponent;

    if (this.state.pageCount !== 1) {
      paginationComponent = (
        <PaginationComponent
          pageCount={this.state.pageCount}
          activePage={this.state.activePage}
          onClick={this.selectPage}
        />
      );
    }

    return (
      <div className="CourseTopicContainer">
        <h3>
          All courses in topic {this.state.topics[this.state.topicId - 1]}
        </h3>
        <hr />
        <MDBRow>
          {this.state.results.map(course => {
            return (
              <MDBCol key={course.id} lg="3" md="4">
                <CourseCardComponent
                  key={course.id}
                  authInfo={this.props.authInfo}
                  course={course}
                />
              </MDBCol>
            );
          })}
        </MDBRow>
        {paginationComponent}
      </div>
    );
  }
}

export default CourseTopicContainer;
