import React from 'react';
import logo from './logo.svg';
import './App.css';
import Laundry from './Laundry';
import LaundryContainer from './LaundryContainer';
import LaundryDoor from './LaundryDoor';

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
        <Laundry />        
      </header>
    </div>
  );
}

export default App;
