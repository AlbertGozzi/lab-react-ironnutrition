import React, { Component } from 'react';

class FoodBox extends Component {
    state = {
        foodQuantity: 1
    }

    updateQuantity = (e) => {
        this.setState({
            foodQuantity: e.target.value * 1
        })
    }

    render() {
        return (
            <div>
                <div className="box">
                <article className="media">
                    <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={this.props.food.image} alt={this.props.name} />
                    </figure>
                    </div>
                    <div className="media-content">
                    <div className="content">
                        <p>
                        <strong>{this.props.food.name}</strong> <br />
                        <small>{this.props.food.calories} cal</small>
                        </p>
                    </div>
                    </div>
                    <div className="media-right">
                    <div className="field has-addons">
                        <div className="control">
                        <input onChange={this.updateQuantity}
                            className="input"
                            type="number" 
                            value={this.state.foodQuantity}
                        />
                        </div>
                        <div className="control">
                        <button className="button is-info" onClick={(e) => {this.props.addFoodToTodays(this.props.food, this.state.foodQuantity)}}>
                            +
                        </button>
                        </div>
                    </div>
                    </div>
                </article>
                </div>
            </div>
        );
    }
}

export default FoodBox;