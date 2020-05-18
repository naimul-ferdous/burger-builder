import React from 'react';
import burgerLogo from '../../assets/images/original.png'
import classes from './Logo.module.css'
const Logo = () => {
    //style={{ height: props.height }}
    return (
        <div className={classes.Logo} > 
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
};

export default Logo;