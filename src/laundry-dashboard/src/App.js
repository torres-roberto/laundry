import React from 'react';
import './App.css';
import LaundryMachine from './LaundryMachine/LaundryMachine';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
        <LaundryMachine />        
      </header>
    </div>
  );
}

export default App;
