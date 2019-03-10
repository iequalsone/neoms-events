// import _ from "underscore";
import React, { Component } from "react";
import axios from "axios";

import EventsSearch from "./EventsSearch";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
import { Spinner, BuildEventsObj as buildEventsObj } from "./common";

class EventsList extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      tags: [],
      events_total: 0,
      keyword: "",
      loading: true,
      paging: true,
      nextTag: "",
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchRegionChange = this.onSearchRegionChange.bind(this);
    this.onSearchDateChange = this.onSearchDateChange.bind(this);
  }

  fetchEvents(p) {
    let page = p;

    if (typeof this.state.page !== "undefined") {
      page = this.state.page;
    }

    if (typeof page === "undefined") {
      page = 1;
    }

    if (page < 0) {
      page = 1;
    }

    // console.log(page);

    var self = this;
    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL_V2 + "/events/" + page)
      .then(result => {
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState({
          events,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchEventsByTag(tag) {
    var self = this;
    self.setState({
      loading: true,
    });

    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL + "/search-events-by-tag/" + tag)
      .then(result => {
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState({
          events,
          loading: false,
          paging: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchEventsTotal() {
    var self = this;
    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL_V2 + "/events-total")
      .then(result => {
        self.setState({
          events_total: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderRows() {
    var rows = [];
    // var self = this;
    this.state.events.forEach((event, index) => {
      // console.log(event);
      rows.push(<EventCard key={event.id} event={event} />);
    });

    if (rows.length <= 0) {
      rows.push(<p key="NO_RESULTS">Sorry, no events to display at this time.</p>);
    }

    return rows;
  }

  renderPagination() {
    if (!this.state.paging) {
      return;
    }

    return (
      <Pagination
        totalItems={this.state.events_total}
        currentPage={this.props.match.params.page}
        itemsPerPage="9"
      />
    );
  }

  onSearchSubmit(events) {
    this.setState({
      events,
      paging: false,
    });
  }

  onSearchRegionChange(events) {
    this.setState({
      events,
      paging: false,
    });
  }

  onSearchDateChange(events) {
    this.setState({
      events,
      paging: false,
    });
  }

  componentDidMount() {
    const { tag, page } = this.props.match.params;

    // console.log(page);

    if (typeof tag !== "undefined") {
      this.fetchEventsByTag(tag);
    } else {
      this.setState({
        page,
      });
      this.fetchEvents(page);
    }

    this.fetchEventsTotal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== this.props.match.params.page) {
      this.setState({
        page: this.props.match.params.page,
      });
    }

    // console.log(prevProps);
    // console.log(prevState);
    // console.log(this);

    if (prevState.nextTag !== this.state.nextTag) {
      this.fetchEventsByTag(this.state.nextTag);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.nextTag !== prevState.nextTag) {
      return { nextTag: nextProps.match.params.tag };
    }

    return null;
  }

  render() {
    // console.log(this.state.events);
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className="page-header text-center">
            <h1>Event Listings</h1>
          </div>

          <EventsSearch
            onSearchSubmit={this.onSearchSubmit}
            onSearchRegionChange={this.onSearchRegionChange}
            onSearchDateChange={this.onSearchDateChange}
            keyword={this.state.keyword}
          />

          <div className="row">
            <div className="container event-list">{this.renderRows()}</div>
          </div>

          {this.renderPagination()}
        </div>
      );
    }
  }
}

export default EventsList;
