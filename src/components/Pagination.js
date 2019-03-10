import React, { Component } from "react";

class Pagination extends Component {
  renderPrevLink(currentPage, totalPages) {
    let prevPage = 1;
    // console.log(currentPage);

    if (typeof currentPage === "undefined" || currentPage <= 1) {
      return;
    }

    if (currentPage !== 1 && currentPage <= totalPages) {
      prevPage = --currentPage;
    }

    if (currentPage > totalPages) {
      prevPage = --currentPage;
    }

    return (
      <a href={"/" + process.env.REACT_APP_BASE_URL + "/" + prevPage}>
        Previous
      </a>
    );
  }

  renderNextLink(currentPage, totalPages) {
    let nextPage = 2;

    if (currentPage >= totalPages) {
      return;
    }

    if (currentPage <= totalPages) {
      nextPage = ++currentPage;
    }

    return (
      <a href={"/" + process.env.REACT_APP_BASE_URL + "/" + nextPage}>Next</a>
    );
  }

  render() {
    const { currentPage, itemsPerPage, totalItems } = this.props;
    const totalPages = totalItems / itemsPerPage;
    return (
      <div className="row event-pagination">
        <div className="col-xs-6">
          <p className="text-right">
            {this.renderPrevLink(currentPage, totalPages)}
          </p>
        </div>
        <div className="col-xs-6">
          <p className="text-left">
            {this.renderNextLink(currentPage, totalPages)}
          </p>
        </div>
      </div>
    );
  }
}

export default Pagination;
