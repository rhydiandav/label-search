import React from 'react';

const Filter = props => {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.handleSubmit();
        }}
      >
        <input
          type={'text'}
          onChange={e => {
            props.handleChange(e.target.value);
          }}
        />
        <input type={'submit'} value={'Search'} />
      </form>
    </div>
  );
};

export default Filter;
