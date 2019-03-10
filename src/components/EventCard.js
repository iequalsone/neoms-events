import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TagLink from "./TagLink";
import dateFormat from "dateformat";
import placeholderImage from "../images/events-placeholder.jpg";

class EventCard extends Component {
  renderImage(image, member_profile_image, title) {
    // console.log(image);
    // console.log(member_profile_image);
    if (!image) {
      // console.log(member_profile_image);
      if (!member_profile_image) {
        return (
          <img className="card-img-top" src={placeholderImage} alt={title} />
        );
      }
      return (
        <img className="card-img-top" src={member_profile_image} alt={title} />
      );
    }

    return <img className="card-img-top" src={image[0]} alt={title} />;
  }

  renderDateTime(start_date) {
    // console.log(start_date);
    if (typeof start_date !== "undefined") {
      return (
        <p className="card-text start-date">
          {dateFormat(start_date, "mmmm d, yyyy, h:MM TT")}
        </p>
      );
    }

    return;
  }

  renderTags(tags) {
    if (typeof tags !== "undefined") {
      let output = tags.map(t => {
        return <TagLink key={t} tag={t} />;
      });

      return output;
    }
  }

  renderFloatingTag(floatingTag) {
    if (floatingTag === "") {
      return;
    }

    return <div className="floating-tag">{floatingTag}</div>;
  }

  renderRows() {
    // console.log(this.props);
    const {
      slug,
      image,
      member_profile_image,
      title,
      start_datetime,
      location,
      tags,
      floatingTag,
    } = this.props.event;
    var path = "/" + process.env.REACT_APP_SINGLE_URL + "/" + slug;

    return (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <div className="card mb-4 box-shadow">
          {this.renderFloatingTag(floatingTag)}
          <NavLink to={path}>{this.renderImage(image, member_profile_image, title)}</NavLink>
          <div className="card-body">
            <NavLink to={path}>
              {this.renderDateTime(start_datetime)}
              <h3 className="card-text title">{title}</h3>
              <p className="card-text location">{location}</p>
            </NavLink>
            <div className="justify-content-between align-items-center">
              <p className="card-text tags">{this.renderTags(tags)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // componentDidMount() {
  //   // console.log(this.props);
  // }

  render() {
    return this.renderRows();
  }
}

export default EventCard;
