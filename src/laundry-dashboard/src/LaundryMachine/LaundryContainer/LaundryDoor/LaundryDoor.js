import React from 'react';
import './LaundryDoor.css';
import Bubbles from './Bubbles/Bubbles';

const laundryDoor = (props) => {
    return (
        <div className={`LaundryDoor ${props.status}`}>
        </div>
    );
}

export default laundryDoor;