import React from 'react';

import 'reset-css';

function App() {
  const defaultStyle = {
    'text-align': 'center',
    color: '#fff',
    'font-family': 'Helvetica',
    margin: '1em'
  };
  return (
    <div className="App">
      <header style={defaultStyle}>
        <h1>Label Search</h1>
      </header>
    </div>
  );
}

export default App;
