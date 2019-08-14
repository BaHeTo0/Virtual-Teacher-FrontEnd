import React, { Component } from "react";
import {
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBPagination,
  MDBRow
} from "mdbreact";

class PaginationComponent extends Component {
  render() {
    let pageItems = [];

    for (let i = 1; i <= this.props.pageCount; i++) {
      pageItems.push(
        <MDBPageItem  key={i} active={i === this.props.activePage}>
          <MDBPageNav onClick={()=> this.props.onClick(i)} >{i}</MDBPageNav>
        </MDBPageItem>
      );
    }

    return (
      <MDBRow>
        <MDBCol>
          <MDBPagination className="mt-3">{pageItems}</MDBPagination>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default PaginationComponent;
