import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
})

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProggress] = useState('')

    function showCart(){
        setUserProggress('cart')
    }

    function hideCart(){
        setUserProggress('')
    }

    function showCheckout(){
        setUserProggress('checkout')
    }

    function hideCheckout(){
        setUserProggress('')
    }

    const userProgresCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={userProgresCtx}>{children}</UserProgressContext.Provider>

}

export default UserProgressContext