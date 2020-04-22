import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json'
import FoodBox from './components/FoodBox';
import Form from './components/Form';
import Search from './components/Search';

class App extends Component {
  state = {
    allFoods: foods,
    selectedFoods: [],
    foodFilter: '',
    newFoodForm: {
      display: false
    }
  }

  displayFoods = () => {
    return this.state.allFoods.map(food => {
      if (food.name.toLowerCase().includes(this.state.foodFilter.toLowerCase())) {
        return <FoodBox key={food.name} addFoodToTodays={this.addFoodToTodays} food={food}/>        
      }
      return '';
    });
  }

  displaySelectedFoods = () => {
    return <ul>{this.state.selectedFoods.map((food, i) => {
        return (
          <li key={i} className="listItem">
            <p>{food.quantity} {food.name} = {food.quantity * food.calories} cal</p>
            <button className="button is-info" key={i} onClick={(e) => {this.deleteFromSelectedFoods(i)}}>Delete</button>
          </li>)
    })}</ul>
  }

  toggleForm = () => {
    let newFoodFormCopy = {...this.state.newFoodForm};
    newFoodFormCopy.display = !newFoodFormCopy.display;
    this.setState({
      newFoodForm: newFoodFormCopy
    })
  }

  displayForm = () => {
    if (this.state.newFoodForm.display) { return <Form submitForm={this.submitForm}></Form> }
  }

  submitForm = (e) => {
    e.preventDefault();
    
    // Get value and reset form
    let newFood = {
      name: e.target.name.value,
      calories: e.target.calories.value,
      image: e.target.image.value,
      quantity: 0
    };
    e.target.reset();
    this.toggleForm();

    // Add new food
    let allFoodsCopy = [...this.state.allFoods];
    allFoodsCopy.push(newFood);
    this.setState({
      allFoods: allFoodsCopy
    })
  }

  updateFoodFilter = (e) => {
    this.setState({
      foodFilter: e.target.value
    })
  }

  addFoodToTodays = (food, quantity) => {
    let selectedFoodsCopy = [...this.state.selectedFoods];

    if (selectedFoodsCopy.includes(food)) {
      selectedFoodsCopy[selectedFoodsCopy.indexOf(food)].quantity += quantity;
    } else {
      food.quantity = quantity;
      selectedFoodsCopy.push(food);
    }

    this.setState({
      selectedFoods: selectedFoodsCopy
    });
  }

  deleteFromSelectedFoods = (index) => {
    let selectedFoodsCopy = [...this.state.selectedFoods];

    selectedFoodsCopy.splice(index, 1)

    this.setState({
      selectedFoods: selectedFoodsCopy
    });
  }

  addCalories = () => {
    if (this.state.selectedFoods.length === 0) {return 0};
    return this.state.selectedFoods.reduce((total, element) => total + element.quantity * element.calories, 0);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IronNutrition</h1>
        </header>
        
        <Search updateFoodFilter={this.updateFoodFilter}></Search>
        <button className='button' onClick={this.toggleForm}>Add new food</button>
        {this.displayForm()}
        <section id="main">
          <div id="allFoods">{this.displayFoods()}</div>
          <div id="summary">
            <h1><strong>Today's Foods</strong></h1>
            {this.displaySelectedFoods()}
            <p><strong>Total: {this.addCalories()} cal</strong></p>
          </div> 
         </section>

      </div>
    );
  }
}

export default App;
