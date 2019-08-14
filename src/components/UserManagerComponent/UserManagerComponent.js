import React from "react"
import axios from "axios"
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";

class UserManagerComponent extends React.Component {
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
            .get(`http://localhost:8080/api/users`, config)
            .then(response => {
              this.setState({
                users: response.data
              });
            })
            .catch(error => {
              console.log(error.response);
            });
    }

    changeRole = (id,role) => () => {
        let config = {
            headers: {
              Authorization: "Bearer " + this.props.authInfo.authToken
            }
          };
      
        let payload = {
            userId: id,
            roleName: role
        }

          axios
            .put(`http://localhost:8080/api/admin/role?userId=${id}&roleName=${role}`,payload, config)
            .then(response => {
              this.update()
            })
            .catch(error => {
              console.log(error.response);
            });
    }

    render() {
        let users = null;
        if (this.state.users !== null && this.state.users !== []) {
          users = this.state.users.map(element => {

            let setAdmin = (
                <MDBBtn size="sm" onClick={this.changeRole(element.id, "Admin")}>
                   Set Admin
                </MDBBtn>)

            let setTeacher = (
                <MDBBtn size="sm" onClick={this.changeRole(element.id, "Teacher")}>
                Set Teacher
                </MDBBtn>)

            if (element.roles.length >= 2) {
                setTeacher = (<MDBBtn size="sm" color="red" onClick={this.changeRole(element.id, "Student")}>
                                Remove Teacher
                              </MDBBtn>)
            }
            if (element.roles.length >= 3) {
                setTeacher = (<MDBBtn size="sm" disabled={true} color="red">
                                Teacher
                              </MDBBtn>)
                setAdmin = (<MDBBtn size="sm" disabled={true} color="red">
                                Admin
                              </MDBBtn>)
            }
            return (
              <tr key={element.id}>
                <td>{element.email}</td>
                <td>{element.firstName}</td>
                <td>{element.lastName}</td>
                <td>
                  {setAdmin}
                </td>
                <td>
                  {setTeacher}
                </td>
              </tr>
            );
          });
        }

        if (users.length < 1)
        return (
          <React.Fragment>
            <h2>All Users</h2>
            <h5>You have no users?!</h5>
          </React.Fragment>
        );

        return (
            <div className="UserManagerComponent">
              <h2>All Users</h2>
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
                <MDBTableBody>{users}</MDBTableBody>
              </MDBTable>
            </div>
          );
    }
}

export default UserManagerComponent;