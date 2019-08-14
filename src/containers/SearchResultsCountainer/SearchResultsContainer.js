import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import queryString from "query-string";
import { Redirect } from "react-router";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";
import "./SearchResultsContainer.css";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

class SearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      activePage: 1,
      pageCount: 1,
      qString: queryString.parse(this.props.location.search).q
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        qString: queryString.parse(nextProps.location.search).q
      },
      () => this.selectPage(1)
    );
  }

  componentDidMount() {
    this.selectPage(1);
  }

  selectPage = pageNum => {
    this.setState({ activePage: pageNum });

    let config = {
      headers: {
        Authorization: "Bearer " + this.props.authInfo.authToken
      }
    };

    axios
      .get(
        `http://localhost:8080/api/courses/search?q=${
          this.state.qString
        }&size=8&page=${pageNum - 1}`,
        config
      )
      .then(response => {
        console.log(response);
        this.setState({
          results: response.data.content,
          activePage: pageNum,
          pageCount: response.data.totalPages
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (
      this.state.results === null ||
      this.state.qString === null ||
      this.state.qString === undefined
    ) {
      return null;
    }

    if (this.state.qString === "" || this.state.qString.length < 3)
      return <Redirect to="/" />;

    let paginationComponent;

    if (this.state.pageCount !== 1) {
      paginationComponent = (
        <PaginationComponent
          pageCount={this.state.pageCount}
          activePage={this.state.activePage}
          onClick={this.selectPage}
        />
      );
    }

    return (
      <div className="SearchResultsContainer">
        <h3>
          Search results for "{this.state.qString}
          ":{" "}
        </h3>
        <hr />
        <MDBRow>
          {this.state.results.map(course => {
            return (
              <MDBCol key={course.id} lg="3" md="4">
                <CourseCardComponent
                  key={course.id}
                  authInfo={this.props.authInfo}
                  course={course}
                />
              </MDBCol>
            );
          })}
        </MDBRow>
        {paginationComponent}
      </div>
    );
  }
}

export default SearchResultsContainer;
