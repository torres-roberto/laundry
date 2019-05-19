import React from 'react';
import LaundryContainer from './LaundryContainer/LaundryContainer';
import LaundryHeadBoard from './LaundryHeadBoard/LaundryHeadBoard';
import './LaundryMachine.css';

class Laundry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: "isWashing",
            movement: "shake"
        };

        setTimeout(() => {
            this.setState({
                status: "done",
                movement: "still"
            })
        }, 3000);
    }
    
    render() {
        return (
            <div className={"LaundryMachine " + this.state.movement}>
                <LaundryHeadBoard />
                <LaundryContainer status={this.state.status}/>
            </div>
        );
    }
}

export default Laundry;