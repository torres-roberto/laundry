import React from 'react';
import './LaundryPanel.css';

export default class LaundryConfig extends React.Component {
    test() {
        console.log('hello');
    }
    render() {
        return (
            <div className="LaundryPanel">
                <div onClick={this.test} className="config-button"></div>
                <div onClick={this.test} className="config-button"></div>
                <div onClick={this.test} className="config-button"></div>
            </div>
        )
    }
}