import React, { Component } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";
import "./CourseListComponent.css";

class CourseListComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }

  goToPage = page => {
    this.props.history.push(page);
  };

  render() {
    let courses = null;

    let submitted;
    let submittedRow;
    if (this.props.courses !== null && this.props.courses !== []) {
      courses = this.props.courses.map(element => {
        let url = element.submitted
          ? "/course/" + element.id
          : "/edit/" + element.id;

        if (this.props.authInfo.Teacher === true) {
          submitted = <td>{element.submitted ? "Yes" : "No"}</td>;
          submittedRow = <th>Submitted</th>;
        }
        return (
          <tr key={element.id}>
            <td>{element.name}</td>
            <td>{element.topic.name}</td>
            <td>{element.averageRating}</td>
            <td>{element.author.firstName}</td>
            <td>
              <MDBBtn size="sm" onClick={() => this.goToPage(url)}>
                Go to course
              </MDBBtn>
            </td>

            {submitted}
          </tr>
        );
      });
    }

    if (courses.length < 1)
      return (
        <React.Fragment>
          <h2>{this.props.tableName}</h2>
          <h5>No courses</h5>
        </React.Fragment>
      );

    return (
      <div className="CourseListComponent">
        <h2>{this.props.tableName}</h2>
        <MDBTable striped>
          <MDBTableHead>
            <tr>
              <th>Course</th>
              <th>Topic</th>
              <th>Rating</th>
              <th>Author</th>
              <th>Link</th>
              {submittedRow}
            </tr>
          </MDBTableHead>
          <MDBTableBody>{courses}</MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export default CourseListComponent;
