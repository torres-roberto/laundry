import React from 'react';
import './LaundryPanel.css';
import LaundryConfig from './LaundryConfig.js';

export default class LaundryPanel extends React.Component {
    render() {
        return (
            <div className="LaundryPanel">
                <LaundryConfig />
            </div>
        )
    }
}