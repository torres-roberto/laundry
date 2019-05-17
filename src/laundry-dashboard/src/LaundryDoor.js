import React from 'react';
import './LaundryDoor.css';

const laundryDoor = (props) => {
    return (
        <div className={"LaundryDoor " + props.status}>
        </div>
    );
}

export default laundryDoor;