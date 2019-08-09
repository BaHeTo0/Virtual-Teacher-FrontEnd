import React from "react"
import ProfileCardComponent from "../../components/Profile/ProfileCard/ProfileCardComponent";
import { MDBContainer , MDBCol, MDBRow, MDBInput } from "mdbreact"
import ProfileDetailsComponent from "../../components/Profile/ProfileDetails/ProfileDetailsComponent";
import CourseCardsContainer from "../CourseCardsContainer/CourseCardsContainer"
import axios from "axios"

class ProfilePageContainer extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            profile: {
                picture: {
                    filePath: "https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2019/ofalltheforc.jpg"
                },
                role: "Teacher",
                firstName: "Ivaan",
                lastName: "AndHisLastName",
                email: "student@email.com",

                rightSideOption: 0,
                enrolledCourses: [],
                createdCourses: []
            }
        }
    }

    componentDidMount() {
        let config = {
          headers: {
            Authorization: "Bearer " + this.props.authInfo.authToken
          }
        };

        axios
          .get(
            `http://localhost:8080/api/users/me`,
            config
          )
          .then(response => {
            console.log(response.data);
            this.setState({
                profile: {
                    picture: response.data.picture,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,

                    enrolledCourses: response.data.enrolledCourses,
                    createdCourses: response.data.createdCourses
                }
            })
          })
          .catch(error => {
            console.log(error.response);
          });
      }

    onClick = num => () => {
        this.setState({
            rightSideOption: num
        });
    }

    render() {
        console.log(this.state)

        let rightSide;
        switch(this.state.rightSideOption) {
            case 0: rightSide = <ProfileDetailsComponent profile={this.state.profile} authInfo={this.props.authInfo}/>
                    break;
            case 1: rightSide = <CourseCardsContainer courses={this.state.profile.enrolledCourses} />
                    break;
            case 2: rightSide = <CourseCardsContainer courses={this.state.profile.createdCourses} />
                    break;
            default: rightSide = <ProfileDetailsComponent profile={this.state.profile} authInfo={this.props.authInfo}/>
        }

        return(
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <ProfileCardComponent profile={this.state.profile} authInfo={this.props.authInfo}/>
                        <MDBContainer className="mt-5">
                            <MDBInput onClick={this.onClick(0)} checked={this.state.rightSideOption===0 ? true : false} label="Profile Details"
                                type="radio" />
                            <MDBInput onClick={this.onClick(1)} checked={this.state.rightSideOption===1 ? true : false} label="Enrolled Courses"
                                type="radio" />
                            <MDBInput onClick={this.onClick(2)} checked={this.state.rightSideOption===2 ? true : false} label="Created Courses"
                                type="radio" />
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol>
                        {rightSide}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

}

export default ProfilePageContainer