import React from 'react';
import MapContainer from './MapContainer';

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <div>
                    <MapContainer></MapContainer>
                </div>
            </div>
        )
    }
}

export default Content;