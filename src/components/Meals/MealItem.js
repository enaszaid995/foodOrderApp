import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import AddMealForm from './AddMealForm';
import styles from './MealItem.module.css';
const MealItem = props =>{
    const ctxcart = useContext(CartContext);
    const addItemHandler = (amount)=>{
        ctxcart.addItem({
            id:props.id,
            name:props.name,
            price :props.price,
            amount :amount

        });
        console.log({
            id:props.id,
            name:props.name,
            price :props.price,
            amount :amount

        });
    }
    const price = `$${props.price.toFixed(2)}`;
    return <li  className={styles.meal} key={props.id}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={styles.description}>{props.description}</div>
                    <div className={styles.price}> {price}</div>
                </div>
                <div>
                    <AddMealForm onAddItem = {addItemHandler}/>
                </div>
  </li>;
};
export default MealItem;