import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        // ... update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updateItem;
        }else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return { ...state, items: updatedItems}
    }

    if(action.type === 'REMOVE_ITEM'){
        // ... remove an item from the state
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex];
        
        const updatedItems = [...state.items];
        
        if(existingCartItem.quantity === 1){

            updatedItems.splice(existingCartItemIndex, 1); //removes the item at that index(last index)
        }else {
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1} //we create new item based on the old item where we reduce the quantity
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state, items: updatedItems};

    }

    return state;
}

export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: []});
    
    function addItem(item){
        dispatchCartAction({type: 'ADD_ITEM', item: item});
    }

    function removeItem(id){
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    }

    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;