import React, { Component } from "react";
import AddToCalendar from "react-add-to-calendar";
import dateFormat from "dateformat";
import TagLink from "./TagLink";
import PlaceholderImage from "../images/default-event.jpg";

class EventHeader extends Component {
  renderImage(image, title) {
    // console.log(image);
    if (!image) {
      return <img src={PlaceholderImage} alt={title} />;
    }

    return <img src={image[0]} alt={title} />;
  }

  renderTags(tags) {
    if (typeof tags !== "undefined") {
      let output = tags.map(t => {
        return <TagLink key={t} tag={t} />;
      });

      return output;
    }
  }

  renderContent() {
    const {
      image,
      content,
      start_datetime,
      end_datetime,
      tags,
      title,
      location,
    } = this.props.event;

    // console.log(this.props.event);

    var startTime,
      endTime = "";

    if (end_datetime !== "") {
      startTime = dateFormat(start_datetime, "isoDateTime");
      endTime = dateFormat(end_datetime, "isoDateTime");
    } else {
      startTime = dateFormat(start_datetime, "isoDateTime");
      endTime = dateFormat(start_datetime, "isoDateTime");
    }

    let event = {
      title,
      description: content,
      location,
      startTime,
      endTime,
    };

    let icon = { "calendar-plus-o": "left" };

    return (
      <div className="event-header">
        <div className="col-md-8">{this.renderImage(image, title)}</div>
        <div className="col-md-4">
          <p className="card-text date">
            {dateFormat(start_datetime, "mmm dd, yyyy")}
          </p>
          <h3 className="card-text title">{title}</h3>
          <p className="card-text location">{location}</p>
          <p className="card-text tags">{this.renderTags(tags)}</p>

          <AddToCalendar
            event={event}
            displayItemIcons={false}
            buttonTemplate={icon}
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default EventHeader;
