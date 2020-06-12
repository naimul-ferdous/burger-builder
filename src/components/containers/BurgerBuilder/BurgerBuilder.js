import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        console.log(this.props);
        
        // axios.get('https://react-my-burger-331d6.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error=> {
        //         this.setState({error: true});
        //     })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // alert('You Continue !')
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps= state=> {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps= dispatch=> {
    return {
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));