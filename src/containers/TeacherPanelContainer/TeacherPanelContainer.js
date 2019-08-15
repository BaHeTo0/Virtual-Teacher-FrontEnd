import React, { Component } from "react";
import { Redirect } from "react-router";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBtnGroup
} from "mdbreact";
import axios from "axios";
import "./TeacherPanelContainer.css";

class TeacherPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: null
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
        `http://localhost:8080/api/assignments/${
          this.props.authInfo.userId
        }/teacher`,
        config
      )
      .then(response => {
        console.log(response);
        this.setState({ assignments: response.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  gradeAssignment = (id, grade) => {
    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .put(
        `http://localhost:8080/api/assignments/${id}/grade?grade=${grade}`,
        null,
        config
      )
      .then(response => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (
      this.props.authInfo.Teacher !== true &&
      this.props.authInfo.Teacher !== "true"
    ) {
      return <Redirect to="/404" />;
    }

    if (this.state.assignments === null) return null;

    return (
      <div className="TeacherPanelContainer">
        <h3>Assignments to be graded:</h3>

        <MDBTable striped>
          <MDBTableHead>
            <tr>
              <th>ID</th>
              <th>Assignment</th>
              <th>File type</th>
              <th>Grade</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.assignments.map(assignment => {
              return (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>
                    <MDBBtn size="sm" href={assignment.filePath}>
                      View Assignment
                    </MDBBtn>
                  </td>
                  <td>{assignment.fileType}</td>
                  <td>
                    <MDBBtnGroup size="lg" className="mr-2">
                      <MDBBtn
                        color="danger"
                        onClick={() => this.gradeAssignment(assignment.id, 10)}
                      >
                        10
                      </MDBBtn>
                      <MDBBtn
                        color="danger"
                        onClick={() => this.gradeAssignment(assignment.id, 20)}
                      >
                        20
                      </MDBBtn>
                      <MDBBtn
                        color="danger"
                        onClick={() => this.gradeAssignment(assignment.id, 30)}
                      >
                        30
                      </MDBBtn>
                    </MDBBtnGroup>
                    <MDBBtnGroup size="lg" className="mr-2">
                      <MDBBtn
                        color="warning"
                        onClick={() => this.gradeAssignment(assignment.id, 40)}
                      >
                        40
                      </MDBBtn>
                      <MDBBtn
                        color="warning"
                        onClick={() => this.gradeAssignment(assignment.id, 50)}
                      >
                        50
                      </MDBBtn>
                      <MDBBtn
                        color="warning"
                        onClick={() => this.gradeAssignment(assignment.id, 60)}
                      >
                        60
                      </MDBBtn>
                    </MDBBtnGroup>
                    <MDBBtnGroup size="lg" className="mr-2">
                      <MDBBtn
                        color="success"
                        onClick={() => this.gradeAssignment(assignment.id, 70)}
                      >
                        70
                      </MDBBtn>
                      <MDBBtn
                        color="success"
                        onClick={() => this.gradeAssignment(assignment.id, 80)}
                      >
                        80
                      </MDBBtn>
                      <MDBBtn
                        color="success"
                        onClick={() => this.gradeAssignment(assignment.id, 90)}
                      >
                        90
                      </MDBBtn>
                    </MDBBtnGroup>
                    <MDBBtnGroup size="lg" className="mr-2">
                      <MDBBtn
                        color="info"
                        onClick={() => this.gradeAssignment(assignment.id, 100)}
                      >
                        100
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export default TeacherPanelContainer;
