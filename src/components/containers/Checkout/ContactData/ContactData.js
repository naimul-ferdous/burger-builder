import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../../axios-orders';

class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler= (event)=> {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Naimul Ferdous',
                address: {
                    street: 'kamarpara',
                    zipCode: '41351',
                    country: 'Bangladesh'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'

            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })
        
    }
    render() {
        let form = (
            <form action="">
                <input className={classes.Input} type="text" name='name' placeholder='Your Name' />
                <input className={classes.Input} type="text" name='email' placeholder='Your Email' />
                <input className={classes.Input} type="text" name='street' placeholder='Street' />
                <input className={classes.Input} type="text" name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;