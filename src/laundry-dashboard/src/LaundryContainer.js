import React from 'react';
import './LaundryContainer.css';
import LaundryDoor from './LaundryDoor';

const laundryContainer = (props) => {
    console.log('container', props);
    return (
        <div 
            className="LaundryContainer"
        >
        <LaundryDoor status={props.status}/>
        </div>
    );
}

export default laundryContainer;