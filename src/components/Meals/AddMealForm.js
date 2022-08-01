import { useRef } from 'react';
import AddCartButton from '../UI/AddCartButton';
import Input from '../UI/Input';
import styles from './AddMealForm.module.css';
const AddMealForm = props =>{
  const amountInput = useRef();
  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredAmount = amountInput.current.value;
    const enteredNumberAmount = +enteredAmount;
    if(enteredAmount.trim().length === 0 || enteredNumberAmount < 1 || enteredNumberAmount >5){
        return;
    }
    props.onAddItem(enteredNumberAmount);
      
  }
    return <form className={styles.form} onSubmit={submitHandler}>
        
        <Input
        label='Amount'
        ref= {amountInput}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          ref:amountInput,
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
                 <AddCartButton />
        </form>
};
export default AddMealForm;