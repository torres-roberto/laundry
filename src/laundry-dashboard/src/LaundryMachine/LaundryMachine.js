import React from 'react';
import LaundryContainer from './LaundryContainer/LaundryContainer';
import LaundryHeadBoard from './LaundryHeadBoard/LaundryHeadBoard';
import './LaundryMachine.css';

const LaundryMachine = (props) => (
    <div className={"LaundryMachine " + props.status}>
        <LaundryHeadBoard />
        <LaundryContainer status={props.status}/>
    </div>
);
    

export default LaundryMachine;