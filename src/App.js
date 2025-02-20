import React from 'react';
import Calculator from './Calculator';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>
          {'Calculator'.split('').map((letter, i) => (
            <span key={i} className="letter">{letter}</span>
          ))}
        </h1>
      </header>
      <Calculator />
    </div>
  );
};

export default App;
