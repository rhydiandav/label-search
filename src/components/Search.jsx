import React from 'react';

const Search = props => {
  return (
    <div style={{ margin: '1em' }}>
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

export default Search;
