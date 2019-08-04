import React, { Component } from "react";
import "./HomeContainer.css";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer";

class HomeContainer extends Component {
  render() {
    return (
      <div className="HomeContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8">
              <MDBBtn
                onClick={() => this.props.authHandler("isAuthenticated", true)}
              />
              <h2>Homepage {this.props.authInfo.authToken}</h2>
              <h5>The user is not logged in</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tristique quam in purus eleifend maximus. Nullam sed magna eget
                leo consequat faucibus in vitae magna. Quisque ultricies, enim
                at tempor ornare, lorem orci congue lectus, ut viverra ante
                lectus a quam. Pellentesque elementum luctus risus, vel pulvinar
                magna facilisis at. Vivamus sit amet pretium diam. Suspendisse
                in neque ac orci auctor rutrum.
              </p>
            </MDBCol>
            <MDBCol md="4">
              <img
                src="https://via.placeholder.com/220x180"
                className="rounded float-right"
                alt=""
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Top rated courses</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>

        <hr />
        <MDBContainer className="mx-auto my-1">
          <br />
          <h3>Most Recent courses</h3>
          <br />
          <CourseCardsContainer />
        </MDBContainer>
      </div>
    );
  }
}

export default HomeContainer;
