import React from "react"
import { MDBCol, MDBRow, MDBContainer } from "mdbreact"
import { runInThisContext } from "vm";

class ProfileCardComponent extends React.Component {
    
    render() {

        let image = <img 
            src="https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2019/ofalltheforc.jpg"
            className="rounded"
            height="128"
            width="128"
        />

        if (this.props.profile.picture !== null) {
            image = <img 
            src={this.props.profile.picture.filePath}
            className="rounded"
            height="128"
            width="128"
            />
        }

        let role = "Student"
        if (this.props.authInfo.Teacher) {
            role = "Teacher"
        } if (this.props.authInfo.Admin) {
            role = "Admin"
        }

        return(
            <MDBCol>
                <MDBContainer>
                <MDBRow>
                    {image}
                </MDBRow>
                <MDBRow>
                    <p className="text-center font-weight-bold text-uppercase">{role}</p>
                </MDBRow>
            </MDBContainer>
            </MDBCol>
        );
    }
}

export default ProfileCardComponent;