import React, { Component } from "react";
import axios from "axios";

import EventCard from "./EventCard";

import { BuildEventsObj as buildEventsObj } from "./common";

class SimilarEvents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  fetchEventsByCategory(category) {
    var self = this;
    self.setState({
      loading: true,
    });

    this.serverRequest = axios
      .get(
        process.env.REACT_APP_FEED_URL_V2 +
        "/search-events-by-category/" +
        category +
        "/" +
        self.props.eventId,
      )
      .then(result => {
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState({
          events,
        });
      })
      .catch(error => {
        console.log('No matching events found!');
      });
  }

  renderRows() {
    var rows = [];
    // var self = this;
    this.state.events.forEach((event, index) => {
      // console.log(event);
      rows.push(<EventCard key={event.id} event={event} />);
    });

    return rows;
  }

  componentDidMount() {
    if (this.props.eventCat !== null && this.props.eventCat !== "" && this.props.eventCat !== undefined && this.props.eventCat !== false) {
      this.fetchEventsByCategory(this.props.eventCat);
    }
  }

  renderOutput() {

    if (this.props.eventCat !== null && this.props.eventCat !== "" && this.props.eventCat !== undefined && this.props.eventCat !== false) {

      return (
        <div className="similar-events">

          <div className="container">
            <div className="page-header text-center">
              <h3>Other events you may be interested in</h3>
            </div>
          </div>

          <div className="container">
            <div className="event-list">{this.renderRows()}</div>
          </div>

        </div>
      )
    }

    else {

      return null;

    }

  }

  render() {
    return this.renderOutput();
  }
}

export default SimilarEvents;
