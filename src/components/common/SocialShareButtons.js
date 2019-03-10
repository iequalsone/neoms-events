import React from "react";

const SocialShareButtons = ({ event, slug }) => {
  const { title, content, location } = event;
  let shareLink = window.location.href;
  let output = (
    <span className="social-share">
      <a
        href={
          "mailto:info@domain.com?Subject=Check%20out%20this%20event%3A%20" + title + "%20%40%20" + location + "&Body=" + content.replace(/<\/?[^>]+(>|$)/g, "")
        }
        target="_blank"
      >
        <span className="fa fa-envelope-o fa-3x" />
      </a>

      <a
        href={"https://www.facebook.com/sharer/sharer.php?u=" + shareLink}
        target="_blank"
      >
        <span className="fa fa-facebook-square fa-3x" />
      </a>

      <a
        href={
          "http://www.linkedin.com/shareArticle?mini=true&amp;url=" +
          shareLink +
          "&amp;title=" +
          title +
          "&amp;summary=" +
          content
        }
        target="_blank"
      >
        <span className="fa fa-linkedin-square fa-3x" />
      </a>

      <a
        href={
          "https://twitter.com/intent/tweet?text=" + title + ", " + shareLink
        }
        target="_blank"
      >
        <span className="fa fa-twitter-square fa-3x" />
      </a>
    </span>
  );
  return (
    <div className="social-share-wrap card-text">
      <p>Spread the word: {output}</p>
    </div>
  );
};

export default SocialShareButtons;
