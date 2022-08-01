import styles from './CartItem.module.css';
const CarrtItem=props =>{
    return  <li className={styles['cart-item']}>
                <div>
                    <h2>{props.name}</h2>
                    <div className={styles.summary}>
                    <span className={styles.price}>{props.item.price}</span>
                    <span className={styles.amount}>x {props.item.amount}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                   
                    <button onClick={props.onRemove}>−</button>
                    <button onClick={props.onAdd}>+</button> 
                </div>
        {props.item.name}</li>;
}

export default CarrtItem;