import React from 'react';
import LaundryContainer from './LaundryContainer';
import LaundryPanel from './LaundryPanel';
import './Laundry.css';

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
            <div className={"responsive " + this.state.movement}>
                <LaundryPanel />
                <LaundryContainer status={this.state.status}/>
            </div>
        );
    }
}

export default Laundry;