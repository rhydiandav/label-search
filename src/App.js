import React from 'react';

import 'reset-css';
import Body from './components/Body';

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
      <Body defaultStyle={defaultStyle} />
    </div>
  );
}

export default App;
