import React from "react"
import axios from "axios"
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";

class TeacherRequestsComponent extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            users: []
        }
    }

    componentDidMount() {
       this.update()
    }

    update = () => {
        let config = {
            headers: {
              Authorization: "Bearer " + this.props.authInfo.authToken
            }
          };
      
          axios
            .get(`http://localhost:8080/api/teachers`, config)
            .then(response => {
              this.setState({
                users: response.data
              });
            })
            .catch(error => {
              console.log(error.response);
            });
    }

    accept = id => () => {
        let config = {
            headers: {
              Authorization: "Bearer " + this.props.authInfo.authToken
            }
          };
      
          axios
            .put(`http://localhost:8080/api/teachers/${id}`,null, config)
            .then(response => {
              this.update()
            })
            .catch(error => {
              console.log(error.response);
            });
    }

    deny = id => () => {
        let config = {
            headers: {
              Authorization: "Bearer " + this.props.authInfo.authToken
            }
          };
      
          axios
            .delete(`http://localhost:8080/api/teachers/${id}`, config)
            .then(response => {
              this.update()
            })
            .catch(error => {
              console.log(error.response);
            });
    }

    render() {
        let teacherRequests = null;
        if (this.state.users !== null && this.state.users !== []) {
          teacherRequests = this.state.users.map(element => {
            if (element.accepted) {
                return (
                    <tr key={element.id}>
                        <td>{element.user.email}</td>
                        <td>{element.user.firstName}</td>
                        <td>{element.user.lastName}</td>
                        <td>
                            Already accepted!
                        </td>
                    </tr>
                );                    
            } else {
                return (
                <tr key={element.id}>
                    <td>{element.user.email}</td>
                    <td>{element.user.firstName}</td>
                    <td>{element.user.lastName}</td>
                    <td>
                    <MDBBtn size="sm" onClick={this.accept(element.user.id)}>
                        Accept
                    </MDBBtn>
                    </td>
                    <td>
                    <MDBBtn size="sm" color="red" onClick={this.deny(element.user.id)}>
                        Deny
                    </MDBBtn>
                    </td>
                </tr>
                );
            }
          });
        }

        if (teacherRequests.length < 1)
        return (
          <React.Fragment>
            <h2>Teacher Requests</h2>
            <h5>No requests are pending at the moment!</h5>
          </React.Fragment>
        );

        return (
            <div className="TeacherRequestsComponent">
              <h2>Teacher Requests</h2>
              <MDBTable striped>
                <MDBTableHead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>{teacherRequests}</MDBTableBody>
              </MDBTable>
            </div>
          );
    }
}

export default TeacherRequestsComponent;