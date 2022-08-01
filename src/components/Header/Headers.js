

import React, { Fragment ,useContext} from 'react';
import styles from'./Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import ButtonHeaderCart from './ButtonHeaderCart';
import CartContext from '../../store/CartContext';

function Headers(props) {
  const cartctx= useContext(CartContext);
  let {items} = cartctx;


   const numberOfCartItems = items.reduce((curNumber, item) =>curNumber+item.amount, 0);

  

  return (
    <Fragment>
        <header className={styles.header}>
            <h1>React-Meals</h1>
            <ButtonHeaderCart onShowCart={props.onShow} numberOfCartItems= {numberOfCartItems} />
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt='A table full of delicious food!'/>
        </div>
    </Fragment>
  )
}

export default Headers