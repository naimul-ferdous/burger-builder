import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Burger from '../../Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <Auxiliary>
               <Burger />
               <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;