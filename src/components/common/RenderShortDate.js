import dateFormat from "dateformat";

const RenderShortDate = ({ date }) => {
  return dateFormat(date, "ddd, mmm dd, yyyy - h:MM TT");
};

export default RenderShortDate;
