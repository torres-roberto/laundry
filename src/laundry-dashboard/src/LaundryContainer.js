import React from 'react';
import './LaundryContainer.css';
import LaundryDoor from './LaundryDoor';

class LaundryContainer extends React.Component {
    render() {
        return (
            <div 
                className="LaundryContainer"
            >
            <LaundryDoor />
            </div>
        );
    }
}

export default LaundryContainer;