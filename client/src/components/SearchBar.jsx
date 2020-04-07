import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            vehicle: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleChange(e) {
        this.setState({vehicle: e.target.value});
      }

    handleSubmit(e) {
        e.preventDefault();
        setTimeout(
            function() {
                if (this.state.vehicle !== '') {
                    this.props.search(this.state.vehicle)
                }
            }
            .bind(this),
            1
        );
    }

    clear(e) {
        e.preventDefault();
        this.setState({vehicle: ''})
        this.props.clearSearch()
    }

    render() {
        return (
            <div className="searchbar">
                <form className="searchbar__form">
                    <input type="text" className="searchbar__input" placeholder="Filter by vehicle" 
                        name="vehicle" 
                        value={this.state.vehicle} 
                        onChange={this.handleChange}
                    />
                    <button type="submit" onClick={this.handleSubmit} className="searchbar__filter-btn">Filter</button>
                    <button onClick={this.clear} className="searchbar__clear-btn">Clear</button>
                </form>
            </div>
        )
    }
}

export default SearchBar;