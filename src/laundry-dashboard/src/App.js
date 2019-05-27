import React from 'react';
import './App.css';
import LaundryMachine from './LaundryMachine/LaundryMachine';
import firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ''
    };

    this.getLaundryStatus();
  }
  
  getLaundryStatus() {
    var config = {
      
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var statusListener = firebase.database().ref('/status/');
    
    statusListener.on('value', (status) => {
        this.setState({
            status: status.val()
        });
    });
  }
  
  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <LaundryMachine status={this.state.status}/>        
        </header>
      </div>
    );
  };
}
export default App;
