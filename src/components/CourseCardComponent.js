import React, { Component } from "react";
import './CourseCardComponent.css';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

class CourseCardComponent extends Component {

    render() {
        return (
            <div className="CourseCardComponent">
                <MDBCard>
                    <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                    {/* <p className="font-weight-light">Topic Rating</p> */}
                    <MDBCardBody>
                        <MDBCardTitle>Title of the course goes here</MDBCardTitle>
                        <MDBCardText>
                            Nunc quis massa vitae neque tempus
                            eleifend. Etiam at nisi rhoncus, rutrum
                            ligula vitae, aliquet elit.
                            </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

export default CourseCardComponent;