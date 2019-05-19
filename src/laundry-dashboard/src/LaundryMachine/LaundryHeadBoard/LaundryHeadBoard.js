import React from 'react';
import './LaundryHeadBoard.css';
import LaundryPanel from './LaundryPanel/LaundryPanel';

export default class LaundryHeadBoard extends React.Component {
    render() {
        return (
            <div className="LaundryHeadBoard">
                <LaundryPanel />
            </div>
        )
    }
}