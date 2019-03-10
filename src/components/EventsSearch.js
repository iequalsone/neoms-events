import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { BuildEventsObj as buildEventsObj } from "./common";

class EventsSearch extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      all_events: [],
      all_regions: [],
      keyword: "",
      region: "",
      date_range: "",
      loading: false,
    };

    this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  updateSearchKeyword(event) {
    this.setState({
      keyword: event.target.value,
    });
  }

  fetchEventsByKeyword(keyword) {
    var self = this;

    this.serverRequest = axios
      .get(
        process.env.REACT_APP_FEED_URL +
        "/search-events/" +
        encodeURIComponent(keyword),
      )
      .then(result => {
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState(
          {
            events,
            loading: false,
          },
          // return list of events after state has been set
          () => {
            this.props.onSearchSubmit(this.state.events);
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchEventsByRegion(region) {
    var self = this;

    this.serverRequest = axios
      .get(
        process.env.REACT_APP_FEED_URL_V2 + "/search-events-by-region/" + region,
      )
      .then(result => {
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState(
          {
            events,
            loading: false,
          },
          // return list of events after state has been set
          () => {
            // console.log(this.state.events);
            this.props.onSearchRegionChange(this.state.events);
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchEventsByDate(date) {
    var self = this;



    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL_V2 + "/search-events-by-date/" + date)
      .then(result => {
        console.log(date);
        // console.log(result.data);
        const events = buildEventsObj(result.data);
        self.setState(
          {
            events,
            loading: false,
          },
          // return list of events after state has been set
          () => {
            // console.log(this.state.events);
            this.props.onSearchDateChange(this.state.events);
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchAllEvents() {
    var self = this;
    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL_V2 + "/events-all")
      .then(result => {
        self.setState({
          all_events: result.data.map(val => {
            return {
              id: val.id,
              slug: val.slug,
              title: val.title,
            };
          }),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchAllRegions() {
    var self = this;
    this.serverRequest = axios
      .get(process.env.REACT_APP_FEED_URL + "/regions-all")
      .then(result => {
        self.setState({
          all_regions: result.data.map(val => {
            const { id, slug, name } = val;
            return {
              id,
              slug,
              name,
            };
          }),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  outputRegions(regions) {
    let output = regions.map(r => {
      const { id, name, slug } = r;
      return (
        <option key={id} value={slug}>
          {name}
        </option>
      );
    });

    // console.log(regions);

    return output;
  }

  outputSpinner() {
    if (this.state.loading) {
      return (
        <span className="spinner-wrap">
          <i className="fa fa-cog fa-spin" aria-hidden="true" />
        </span>
      );
    }

    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      region: '',
      date_range: ''
    });
    this.fetchEventsByKeyword(this.state.keyword);
  }

  handleRegionChange(event) {
    this.setState({
      loading: true,
      keyword: '',
      region: event.target.value,
      date_range: '',
    });
    this.fetchEventsByRegion(event.target.value);
  }

  handleDateChange(event) {
    this.setState({
      loading: true,
      keyword: '',
      region: '',
      date_range: event.target.value,
    });
    this.fetchEventsByDate(event.target.value);
  }

  componentDidMount() {
    this.fetchAllEvents();
    this.fetchAllRegions();
  }

  render() {
    // console.log(this.props);
    var rows = [];
    var self = this;
    this.state.all_events.forEach(function (event, index) {
      if (
        event.title.toLowerCase().indexOf(self.state.keyword.toLowerCase()) !==
        -1
      ) {
        var path = "/" + process.env.REACT_APP_SINGLE_URL + "/" + event.slug;
        rows.push(
          <NavLink
            key={event.id}
            data-value={event.id}
            to={path}
            className="list-group-item list-group-item-action"
          >
            {event.title}
          </NavLink>,
        );
      }

      // console.log(event);
    });

    return (
      <div className="search-form-wrap row">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-3 col-md-3">
            <select value={this.state.region} name="region" onChange={this.handleRegionChange}>
              <option>Region</option>
              {this.outputRegions(this.state.all_regions)}
            </select>
            {this.outputSpinner()}
          </div>
          <div className="form-group col-sm-3 col-md-3">
            <select value={this.state.date_range} name="date-range" onChange={this.handleDateChange}>
              <option value="all-time">All Time</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <input
              name="keyword"
              value={this.state.keyword}
              onChange={this.updateSearchKeyword}
              type="text"
              className="form-control"
              placeholder="Search events"
              required
            />
            <button type="submit" className="btn btn-default">
              SEARCH
            </button>
          </div>
        </form>
        {/* <div className="list-group">{rows}</div> */}
      </div>
    );
  }
}

export default EventsSearch;