import './App.css';
import Headers from './components/Header/Headers';
import React,{ useState } from 'react';
import Meal from './components/Meals/Meal';
import Cart from './components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';


function App() {
  const [hasItemInCart , setItemInCart]=useState(false);
  const ShowCartHandler = ()=>{
    setItemInCart(true);
  };
  const HideCartHandler = ()=>{
    setItemInCart(false);
  };
  return <CartContextProvider>
            {hasItemInCart && <Cart onClose={HideCartHandler}/>}
            <Headers onShow={ShowCartHandler}/>
            <Meal/>
         </CartContextProvider>
    
      
    
  ;
}

export default App;
