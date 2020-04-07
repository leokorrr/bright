import React from 'react';
import axios from 'axios';

class CouriersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            couriers: [],
            err: false
        };
    }

    componentDidMount() {
        if (this.props.couriers.length === 0) {
            this.setState({err: true})
        } else {
            this.setState({couriers: this.props.couriers})
        }
    }

    componentDidUpdate(nextProps) {
        const { couriers } = this.props
        if (nextProps.couriers !== couriers) {
            if (couriers.length > 0) {
                this.setState({err: false})
                this.getCouriers()
            } else {
                this.setState({err: true})
            }
            // if (couriers.length === 0) {
            //     this.setState({err: true})
            // }
        } 
    }

    getCouriers = () => {
        axios.get('http://localhost:5000/')
            .then(res => {
                const couriers = res.data;
                this.setState({ couriers })
            })
    }

    displayCouriers = () => {
        return this.state.couriers.map((courier, index) => {
            return (
                <div className="couriers-list__card courier-card" key={index}>
                    <div className="courier-card__name">
                        <span className="bold courier-card__label">Name:</span> <br/> {courier.name}
                    </div>
                    <div className="courier-card__location">
                        <span className="bold courier-card__label">Location: </span> <br/>
                        <span>Lat: </span> <span className="courier-card__location-ltd">{courier.lat}, </span><br/>
                        <span>Lng: </span> <span className="courier-card__location-lng">{courier.lng} </span>
                    </div>
                    <div className="courier-card__vehicle">
                        <span className="bold courier-card__label">Vehicle: </span> <br/>
                        <span className="courier-card__vehicle-name">{courier.vehicle} </span>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.state.err) {
            return (
                <div className="couriers-list">
                    <h2 className="couriers-list__title">Couriers:</h2>
                    <div>Nothing was found</div>   
                </div>
            )
        } else {
            return (
                <div className="couriers-list">
                    <h2 className="couriers-list__title">Couriers:</h2>
                    {this.displayCouriers()}    
                </div>
            )
        }
        
    }
}

export default CouriersList;