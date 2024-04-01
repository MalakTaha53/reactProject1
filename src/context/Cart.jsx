import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const getCartData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
                headers:
                {
                    Authorization: `Tariq__${token}`
                }
            });
            const items = [];
            data.products.map((pro) => {
                if (pro.quantity > 1) {
                    for (let i = 0; i < pro.quantity; i++) {
                        items.push({ ...pro });
                    }
                } else {
                    items.push(pro);
                }
            })
            setCart(items);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCartData();
    }, [cart]);

    return <CartContext.Provider value={{ cart, setCart }}>
        {children}
    </CartContext.Provider>
};
export default CartContextProvider;