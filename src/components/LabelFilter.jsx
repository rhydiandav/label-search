import React from 'react';

const LabelFilter = props => {
  return (
    <div>
      <select onClick={e => props.handleFilter(e.target.value)}>
        {props.labels.map(label => {
          return <option key={label}>{label}</option>;
        })}
      </select>
    </div>
  );
};

export default LabelFilter;
