// import React from "react";

const BuildEventsObj = (data) => {
  // console.log(data);
  let output = data.map(val => {
    const { id, slug, title, location, region, start_datetime, end_datetime, image, member_profile_image, tags, time } = val;

    return {
      id,
      slug,
      title,
      location,
      region,
      start_datetime,
      end_datetime,
      image,
      member_profile_image,
      tags,
      time,
      floatingTag: val.floating_tag,
    };
  });

  // console.log(output);

  return output;
}

export default BuildEventsObj;