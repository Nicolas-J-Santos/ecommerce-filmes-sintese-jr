import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/carrinho");
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (filme) => {
    try {
      await fetch("http://localhost:3000/carrinho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmeId: filme._id, quantidade: 1 }),
      });

      fetchCartItems();
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
    }
  };

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const value = {
    cartItems,
    fetchCartItems,
    addToCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};