import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
  ICartItem,
  getBulkDiscountFromQuantity,
  calculateCartItemSubtotal,
} from "@/lib/models/interfaces/ICartItem";

interface CartContextProps {
  cartItems: ICartItem[];
  addCartItem: (item: ICartItem) => void;
  removeCartItem: (index: number) => void;
  updateCartItem: (updatedItem: ICartItem) => void;
  updateCartItemQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  syncCartWithServer: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    }
  }, []);
  console.log("Initial cart items from localStorage:", cartItems);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Cart items saved to localStorage:", cartItems);
    }
  }, [cartItems, isClient]);

  const syncCartWithServer = useCallback(async () => {
    try {
      const response = await fetch("/api/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
      if (!response.ok) {
        throw new Error(`Failed to sync cart with server: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to sync cart with server", error);
    }
  }, [cartItems]);

  const addCartItem = useCallback(
    (item: ICartItem) => {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      syncCartWithServer();
    },
    [cartItems, syncCartWithServer]
  );

  const removeCartItem = useCallback(
    (index: number) => {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      syncCartWithServer();
    },
    [cartItems, syncCartWithServer]
  );

  const updateCartItem = useCallback(
    (updatedItem: ICartItem) => {
      const index = cartItems.findIndex(
        (item) => item.cartItemId === updatedItem.cartItemId
      );

      if (index !== -1) {
        const updatedCartItems = cartItems.map((item, i) =>
          i === index ? updatedItem : item
        );
        setCartItems(updatedCartItems);
        syncCartWithServer();
      }
    },
    [cartItems, syncCartWithServer]
  );

  const updateCartItemQuantity = useCallback(
    (index: number, newQuantity: number) => {
      const updatedCartItems = cartItems.map((item, i) => {
        if (i === index) {
          const newBulkDiscount = getBulkDiscountFromQuantity(item.product, newQuantity).bulkDiscountPercentageOff;
          const updatedItem = {
            ...item,
            quantity: newQuantity,
            bulkDiscountPercentageOff: newBulkDiscount,
            subtotal: calculateCartItemSubtotal({
              ...item,
              quantity: newQuantity,
              bulkDiscountPercentageOff: newBulkDiscount,
            }),
          };
          return updatedItem;
        }
        return item;
      });
      setCartItems(updatedCartItems);
      syncCartWithServer();
    },
    [cartItems, syncCartWithServer]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    syncCartWithServer();
  }, [syncCartWithServer]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        updateCartItem,
        updateCartItemQuantity,
        clearCart,
        syncCartWithServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
