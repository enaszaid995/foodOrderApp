import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import styles from './MEalItems.module.css'; 
// const dummy = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//       },
//       {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//       },
//       {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//       },
//       {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//       }];
function MealItems() {
  const [meals , setMeals]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(()=>{
    const fetchMeals = async()=>{
      const response= await fetch('https://addtasks-62bbc-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price:  responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[])
  
  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

const mealItem = meals.map((item)=>{
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