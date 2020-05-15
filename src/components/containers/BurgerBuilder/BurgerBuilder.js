import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state= {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
        return (
            <Auxiliary>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;