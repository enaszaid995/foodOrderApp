import React from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './ButtonHeaderCart.module.css';

function ButtonHeaderCart(props) {
 
  return (
    <button className={styles.button} onClick={props.onShowCart}>
        <span className={styles.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={styles.badge}>{props.numberOfCartItems}</span>
    </button>
  )
}

export default ButtonHeaderCart