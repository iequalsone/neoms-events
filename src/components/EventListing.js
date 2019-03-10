import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import EventHeader from "./EventHeader";
import EventArticle from "./EventArticle";
import SimilarEvents from "./SimilarEvents";

import { Spinner } from "./common";

class EventListing extends Component {
  constructor() {
    super();
    this.state = {
      event: [],
      nextEvent: "",
      loading: true,
    };
  }

  fetchEvent(slug) {
    var self = this;
    // console.log(self);
    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL_V2 + "/event/" + slug)
      .then(function (result) {
        // console.log(result.data[0]);
        if (typeof result.data[0] !== "undefined") {
          const {
            id,
            title,
            content,
            content_orig,
            start_datetime,
            end_datetime,
            location,
            tags,
            category,
            tickets_cost,
            time,
            sub_title,
            website,
            image,
          } = result.data[0];
          self.setState({
            event: {
              id,
              title,
              content,
              content_orig,
              slug,
              start_datetime,
              end_datetime,
              location,
              tags,
              category,
              tickets_cost,
              time,
              sub_title,
              website,
              image,
            },
            loading: false,
          });

          // console.log(self.state);
        }
      }) // Catch any error here
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchEvent(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.nextEvent !== this.state.nextEvent) {
      this.setState({ loading: true });
      this.fetchEvent(this.state.nextEvent);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.nextEvent !== prevState.nextEvent) {
      return { nextEvent: nextProps.match.params.slug };
    }

    return null;
  }

  renderOutput() {
    if (this.state.event.length <= 0) {
      return (
        <div className="col-xs-12">
          <p>Event doesn't exist.</p>

          <NavLink to={"/" + process.env.REACT_APP_BASE_URL}>
            Return to Events List
          </NavLink>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <EventHeader event={this.state.event} />
        </div>

        <div className="row">
          <EventArticle event={this.state.event} />
        </div>

        <div className="row">
          <SimilarEvents
            eventId={this.state.event.id}
            eventCat={this.state.event.category}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return this.renderOutput();
    }
  }
}

export default EventListing;
