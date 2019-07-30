import React, { Component } from "react";
import './CourseCardsContainer.css';
import { MDBCol, MDBRow } from 'mdbreact';
import CourseCardComponent from "../../components/CourseCardComponent";

class CourseCardsContainer extends Component {

    render() {
        return (
            <div className="CourseCardsContainer">
                <MDBRow>
                    <MDBCol md="3">
                        <CourseCardComponent></CourseCardComponent>
                    </MDBCol>
                    <MDBCol md="3">
                        <CourseCardComponent></CourseCardComponent>
                    </MDBCol>
                    <MDBCol md="3">
                        <CourseCardComponent></CourseCardComponent>
                    </MDBCol>
                    <MDBCol md="3">
                        <CourseCardComponent></CourseCardComponent>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

export default CourseCardsContainer;