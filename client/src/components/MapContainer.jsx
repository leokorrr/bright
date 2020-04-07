import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

import SearchBar from './SearchBar';
import CouriersList from './CouriersList';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            couriers: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedCourier: {},
            vehicleType: ''
        };
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.setState({vehicleType: ''})
        this.getCouriers()

        setInterval(()=> {
            this.getCouriers()
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }, 10000)
    }

    handleMarkerClick = (props, marker, e) => {
        this.setState({
          selectedCourier: this.state.couriers[props.courierIndex],
          activeMarker: marker,
          showingInfoWindow: true
        });
      };
    
    handleClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    displayMarkers = () => {
        return this.state.couriers.map((courier, index) => {
            return ( 
                    <Marker key={index} id={index} courierIndex={index} position={{
                        lat: courier.lat,
                        lng: courier.lng
                    }}
                    onClick = {this.handleMarkerClick} 
                    >
                    </Marker>
            )
        })
    }

    getCouriers = () => {
        axios.get('http://localhost:5000/')
            .then(res => {
                const couriers = res.data;
                this.setState({ couriers })
            })
    }

    search = (vehicleType) => {
        if (vehicleType === '') {
            vehicleType = null
        }
        axios.post('http://localhost:5000/', {
            vehicleType: vehicleType 
        })
        .then(res => {
            console.log(res);
  
            if (res.status === 200) {
              this.getCouriers();
            }
          })
          .catch(err => {
            console.log(err);
          });
    }

    clearSearch = () => {
        axios.post('http://localhost:5000/', {
            vehicleType: null
        })
        .then(res => {
            console.log(res);
  
            if (res.status === 200) {
              this.getCouriers();
            }
          })
          .catch(err => {
            console.log(err);
          });
    }

    render() {
        if (this.state.couriers.length === 0) {
            return (
                <div className="map-ctn">
                    <div className="map">
                        <SearchBar search = {this.search} clearSearch = {this.clearSearch}></SearchBar>
                        <Map
                            google={this.props.google}
                            zoom={13}
                            initialCenter={{lat: 54.372158, lng: 18.638306}}
                            className="map__box"
                        >
                            {this.displayMarkers()}
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                                onClose={this.handleClose}
                                >
                                <div>{this.state.selectedCourier.name}</div>
                            </InfoWindow>
                        </Map>
                    </div>
                    <div>
                        <CouriersList couriers={this.state.couriers}></CouriersList>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="map-ctn">
                    <div className="map">
                        <SearchBar search = {this.search} clearSearch = {this.clearSearch}></SearchBar>
                        <Map
                            google={this.props.google}
                            zoom={13}
                            initialCenter={{lat: 54.372158, lng: 18.638306}}
                            className="map__box"
                        >
                            {this.displayMarkers()}
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                                onClose={this.handleClose}
                                >
                                <div>{this.state.selectedCourier.name}</div>
                            </InfoWindow>
                        </Map>
                    </div>
                    <div>
                        <CouriersList couriers={this.state.couriers}></CouriersList>
                    </div>
                </div>
            )
        }
        
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCfAVbb6L4y9aibWkGSuwdIOnSsDGhVtoc'
  })(MapContainer);