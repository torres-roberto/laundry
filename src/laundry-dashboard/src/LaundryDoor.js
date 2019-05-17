import React from 'react';
import './LaundryDoor.css';

export default class LaundryDoor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: "isWashing" };
    }

    render() {
        setTimeout(() => {
            this.setState({
                status: "done"
            })
        }, 2000);

        return (
            <div className={"LaundryDoor " + this.state.status}>
            </div>
        );
    }
}