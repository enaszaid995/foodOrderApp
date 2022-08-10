import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty=(value)=> value.trim().length === 0;

const isFiveChar=(value)=> value.trim().length === 5;

const Checkout = (props)=>{
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
      });
    

    const  nameInputRef =useRef();
    const streetInputRef =useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

    const confirmHandler=(event)=>{
        event.preventDefault();
        const  enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        
        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid =isFiveChar(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        const formInputsValidity = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;
        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalCodeIsValid,
          
        });
        if(!formInputsValidity){
                return;
            }
        
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
          });

    }

    
  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? '' : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    formInputsValidity.street ? '' : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    formInputsValidity.postalCode ? '' : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    formInputsValidity.city ? '' : styles.invalid
  }`;

    return <form className={styles.form} onSubmit={confirmHandler}>
    <div className={nameControlClasses}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef} />
      {!formInputsValidity.name && <p>Please enter a valid name!</p>}
    </div>
    <div className={streetControlClasses}>
      <label htmlFor='street'>Street</label>
      <input type='text' id='street' ref={streetInputRef} />
      {!formInputsValidity.street && <p>Please enter a valid street!</p>}
    </div>
    <div className={postalCodeControlClasses}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='text' id='postal' ref={postalCodeInputRef} />
      {!formInputsValidity.postalCode && (
        <p>Please enter a valid postal code (5 characters long)!</p>
      )}
    </div>
    <div className={cityControlClasses}>
      <label htmlFor='city'>City</label>
      <input type='text' id='city' ref={cityInputRef} />
      {!formInputsValidity.city && <p>Please enter a valid city!</p>}
    </div>
    <div className={styles.actions}>
      <button type='button' onClick={props.onClose}>
        Cancel
      </button>
      <button className={styles.submit} type="submit">Confirm</button>
    </div>
  </form>
}
export default Checkout;