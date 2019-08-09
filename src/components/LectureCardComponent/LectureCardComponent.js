import React, { Component } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./LectureCardComponent.css";
import ReactPlayer from "react-player";
import VideoThumbnail from "react-video-thumbnail";

class LectureCardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LectureCardComponent">
        <MDBRow>
          <MDBCol md="4">
            {/* <img
              src="https://via.placeholder.com/220x180"
              className="rounded img-thumbnail"
              alt=""
            /> */}
            {/* <ReactPlayer url="https://www.youtube.com/watch?v=GlvlgmjMi98" height="220px" width="100%" light/> */}
            <VideoThumbnail
              videoUrl="http://localhost:8080/api/videos/1"
            />
          </MDBCol>
          <MDBCol md="6">
            <h3>Lecture Name</h3>

            <div className="lecture-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum euismod neque ac diam ornare, at tincidunt lectus
              vestibulum. Sed viverra magna in ex scelerisque, sed viverra
              tellus tincidunt. Maecenas sem risus, consequat sed purus quis,
              sollicitudin luctus neque. Aliquam molestie non mi nec bibendum.
              In at ante eu erat dapibus eleifend id a sem. Donec molestie,
              neque vitae laoreet semper, odio tellus laoreet nisi, ut
              sollicitudin mauris ante in mauris. Maecenas eu metus id lorem
              accumsan ultricies non id eros. Donec sit amet mi quis justo
              aliquam gravida ac eget ex. Suspendisse malesuada velit a massa
              pellentesque, ut tempor elit gravida.
            </div>
          </MDBCol>
          <MDBCol md="2">
            <div className="align-baseline">
              <MDBBtn>Enroll</MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default LectureCardComponent;
