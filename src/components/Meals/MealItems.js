import React from 'react'
import MealItem from './MealItem';
import styles from './MEalItems.module.css'; 
const dummy = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
      },
      {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
      },
      {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
      },
      {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
      }];
function MealItems() {
const mealItem = dummy.map((item)=>{
    return <MealItem key={item.id}
    id={item.id} 
    name={item.name}
    description={item.description}
    price={item.price}/>;
});
  return <section className={styles.meals}>
                <ul>{mealItem}</ul>
    </section>
}

export default MealItems