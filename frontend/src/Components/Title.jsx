import React from "react";

const Title = ({ title, maxLength = 50 }) => {
  const truncateTitle = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return <h3>{truncateTitle(title, maxLength)}</h3>;
};

export default Title;
