import React from "react";

const Filter = ({ filterBy, value }) => {
  return (
    <div>
      filter shown with <input onChange={filterBy} value={value} />
    </div>
  );
};

export default Filter;
