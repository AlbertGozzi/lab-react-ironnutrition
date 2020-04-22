import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.props.submitForm} autoComplete="off">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name"></input>
                    <label htmlFor="calories">Calories:</label>
                    <input type="number" id="calories"></input>
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image"></input>
                    <input type="submit" id="submit"></input>
                </form>
            </div>
        );
    }
}

export default Form;