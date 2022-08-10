import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CarrtItem from './CartItem';
import Checkout from './Checkout';
const Cart =props =>{
    const [isSubmitting , setIsSubmitting]=useState(false);
    const [didSubmit , setDidSubmit]=useState(false);
    const [isOrder , setIsOrder]=useState(false);
    const [emptyCart , setEmptyCart] = useState(false);
    const ctx = useContext(CartContext);
    const totalAmountt = ctx.totalAmount;
    const finaltotal = `$${totalAmountt.toFixed(2)}`;
    const addHandler =(item)=>{
      const cartItem = { ...item, amount: 1 };
      ctx.addItem(cartItem);
    };
    const removeHandler =(id)=>{
      ctx.removeItem(id);
    };
    const OrderHandler =()=>{
      if(ctx.items.length === 0){
        setEmptyCart(true);
        return;
      }
      setIsOrder(true);
      // ctx.emptyCart();
      // alert("Process Complete");
      // props.onClose();
    }
    const cartItems = (
        <ul className={styles['cart-items']}>
          {ctx.items.map((item) =>
            <CarrtItem key={item.id} item={item}
            onAdd = {addHandler.bind(null,item)}
            onRemove = {removeHandler.bind(null,item.id)}
            />
           
          )}
        </ul>
      );
    const ConfirmOrderHandler=async(UserData)=>{
      setIsSubmitting(true);
      await fetch('https://addtasks-62bbc-default-rtdb.firebaseio.com/orders.json',{
        method:'POST',
        body:JSON.stringify({
          user:UserData,
          items:ctx.items
        })
      });
   
      ctx.emptyCart();
      setIsSubmitting(false);
      setDidSubmit(true);
    }

    const CurrentCart = (
                            <div className={styles.cart}>
                            {cartItems}
                            <div className={styles.total}>
                                <span>Total Amount</span>
                                <span>{finaltotal}</span>
                            </div>
                            {isOrder&&<Checkout onConfirm={ConfirmOrderHandler} onClose={props.onClose}/>}
                            <div className={styles.actions}>
                                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                                <button className={styles.button} onClick={OrderHandler}>Order</button>
                            </div>
                            {emptyCart && <p className={styles.error}>Add item to cart .</p>}
                      </div>);
    const IsSubmitting = (<Fragment>
                          <p >Your Order submit ...</p>
                        </Fragment>);

    const didSubmitMsg = (<Fragment>
        <p>Your Order Done</p>
        <div className={styles.actions}>
                                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                                
                            </div>
      </Fragment>);

    return <Modal onClose={props.onClose}>
              {!isSubmitting && !didSubmit &&CurrentCart}
              {isSubmitting && IsSubmitting}
              {!isSubmitting && didSubmit &&didSubmitMsg}
    </Modal>;
}
export default Cart;