import React from 'react';

const Sort = props => {
  return (
    <div style={{}}>
      <select onClick={e => props.handleSort(e.target.value)}>
        <option>Date (Newest First)</option>
        <option>Date (Oldest First)</option>
      </select>
    </div>
  );
};

export default Sort;
