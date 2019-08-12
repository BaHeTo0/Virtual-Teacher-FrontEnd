import React, { Component } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";
import "./CourseListComponent.css";

class CourseListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let courses = null;
    if (this.props.courses !== null && this.props.courses !== []) {
      courses = this.props.courses.map(element => {
        return (
          <tr key={element.id}>
            <td>{element.name}</td>
            <td>{element.topic.name}</td>
            <td>{element.averageRating}</td>
            <td>{element.author.firstName}</td>
            <td>
              <MDBBtn  size="sm" href={"/courses/" + element.id}>Go to course</MDBBtn>
            </td>
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
            </tr>
          </MDBTableHead>
          <MDBTableBody>{courses}</MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export default CourseListComponent;
