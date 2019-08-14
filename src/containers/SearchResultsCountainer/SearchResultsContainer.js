import React from "react";
import CourseCardsComponent from "../../components/CourseCardsComponent/CourseCardsComponent";
import { MDBContainer } from "mdbreact";
import axios from "axios"
import queryString from "query-string";

class SearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        results: []
    };
  }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.update()
        }
    }

    componentDidMount() {
        this.update();
    }

    update = () => {
        const searchField = queryString.parse(this.props.location.search).searchField

        let config = {
            headers: {
                Authorization: "Bearer " + this.props.authInfo.authToken
            }
            };
        
            axios
            .get(`http://localhost:8080/api/courses/search?searchField=${searchField}`, config)
            .then(response => {
                this.setState({
                    results: response.data
                })
            })
            .catch(error => {
                console.log(error.response);
            });
    }

  render() {
    return(
        <MDBContainer className="mx-auto my-1">
        <h3>Search results for "{queryString.parse(this.props.location.search).searchField}": </h3>
        <hr />
        <CourseCardsComponent
          authInfo={this.props.authInfo}
          courses={this.state.results}
        />
      </MDBContainer>
    )}

}

export default SearchResultsContainer;





















