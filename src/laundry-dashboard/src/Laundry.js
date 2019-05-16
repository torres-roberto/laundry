import React from 'react';
import LaundryContainer from './LaundryContainer';
import LaundryPanel from './LaundryPanel';
import './Laundry.css';

class Laundry extends React.Component {
    render() {
        return (
            <div className="responsive">
                <LaundryPanel />
                <LaundryContainer />
            </div>
        );
    }
}

export default Laundry;