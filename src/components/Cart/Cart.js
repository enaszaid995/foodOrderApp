import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CarrtItem from './CartItem';
const Cart =props =>{
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
      ctx.emptyCart();
      alert("Process Complete");
      props.onClose();
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
    return <Modal onClose={props.onClose}>
        <div className={styles.cart}>
                {cartItems}
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>{finaltotal}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                    <button className={styles.button} onClick={OrderHandler}>Order</button>
                </div>
           </div>
    </Modal>;
}
export default Cart;