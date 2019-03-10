import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { RenderShortDate, SocialShareButtons } from "./common";
import EventSidebar from "./EventSidebar";
import TagLink from "./TagLink";

class EventArticle extends Component {
  renderTags(tags) {
    if (typeof tags !== "undefined") {
      let output = tags.map(t => {
        return <TagLink key={t} tag={t} />;
      });

      return output;
    }
  }

  render() {
    // console.log(this.props);
    const { title, slug, start_datetime, content, tags } = this.props.event;
    return (
      <div className="event-article">
        <div className="col-xs-12 col-sm-8 col-md-8">
          <p>
            <strong>DESCRIPTION</strong>
          </p>
          <h3>{title}</h3>
          <time>
            <RenderShortDate date={start_datetime} />
          </time>
          <div dangerouslySetInnerHTML={{ __html: content }} />

          <p className="card-text tags">{this.renderTags(tags)}</p>
          {/* {<SocialShareButtons event={this.props.event} slug={slug} />} */}
        </div>
        <EventSidebar event={this.props.event} />

        <div className="col-xs-12">
          <NavLink to={"/" + process.env.REACT_APP_BASE_URL}>
            Return to Events List
          </NavLink>
        </div>
      </div>
    );
  }
}

export default EventArticle;
