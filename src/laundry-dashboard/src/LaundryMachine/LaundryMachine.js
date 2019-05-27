import React from 'react';
import LaundryContainer from './LaundryContainer/LaundryContainer';
import LaundryHeadBoard from './LaundryHeadBoard/LaundryHeadBoard';
import './LaundryMachine.css';
import firebase from 'firebase';

class Laundry extends React.Component {
    constructor(props) {
        super(props);

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
        
        this.state = { 
            status: "",
        };
    }
    
    render() {
        return (
            <div className={"LaundryMachine " + this.state.status}>
                <LaundryHeadBoard />
                <LaundryContainer status={this.state.status}/>
            </div>
        );
    }
}

export default Laundry;