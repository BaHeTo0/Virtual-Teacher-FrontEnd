import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import "./FooterContainer.css";

const FooterContainer = () => {
  return (
    <div className="FooterContainer">
      <MDBFooter color="blue-gradient" className="font-small pt-4 pb-4 mt-4">
        <MDBContainer fluid className="text-center text-md-center">
          &copy; {new Date().getFullYear()} Copyright: Virtual Teacher
        </MDBContainer>
      </MDBFooter>
    </div>
  );
};

export default FooterContainer;
