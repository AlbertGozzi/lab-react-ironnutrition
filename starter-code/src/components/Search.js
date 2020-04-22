import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="searchBar">
                <label htmlFor="searchBar">Search foods:</label>
                <input type="text" id="searchBar" onChange={this.props.updateFoodFilter}></input>
            </div>
        );
    }
}

export default Search;