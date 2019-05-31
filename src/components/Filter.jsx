import React from 'react';

const Filter = props => {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.handleSubmit(e.target[0].value);
        }}
      >
        <input type={'text'} />
        <input type={'submit'} value={'Search'} />
      </form>
    </div>
  );
};

export default Filter;
