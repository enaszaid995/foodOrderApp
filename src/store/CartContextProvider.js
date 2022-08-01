
import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState={
    items:[],
    totalAmount:0
};
const CartReducer =(state,action)=>{
    if(action.type === 'ADD'){
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
            );
        const existingCartItem = state.items[existingItemIndex];
        let updatedItems;
        
        
        if(existingCartItem){
            
            const updatedItem= {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
              };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex]= updatedItem;

         }else{
            updatedItems = state.items.concat(action.item);
         }
          
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items :updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type ==='REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
          );
          const existingItem = state.items[existingCartItemIndex];
          const updatedTotalAmount = state.totalAmount - existingItem.price;
          let updatedItems;
          if(existingItem){
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
              } else {
                const updatedItem = { ...existingItem, amount:existingItem.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
              }
          }
          
      
          return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
          };

    }

    if(action.type ==='Empty'){
        return defaultCartState;

    }
    return defaultCartState;
}
const CartContextProvider = (props)=>{
    
    const [CartState , dispatchCartAction]=useReducer(CartReducer,defaultCartState);
    const AddItemHAndler=(item)=>{
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const RemoveItemHAndler =(id)=>{
        dispatchCartAction({type:'REMOVE', id:id});
        console.log(id);
    };
    const EmptyCartHandler= ()=>{
        dispatchCartAction({ type: 'Empty'});
    };
    const cartContext={
        items:CartState.items,
        totalAmount:CartState.totalAmount,
        addItem:AddItemHAndler,
        removeItem:RemoveItemHAndler,
        emptyCart:EmptyCartHandler

    }; 
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};
export default CartContextProvider;