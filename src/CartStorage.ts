import {
  ICartItem,
  getBulkDiscountFromQuantity,
  calculateCartItemSubtotal,
} from "@/lib/models/interfaces/ICartItem";
import { Types } from 'mongoose';

export const getCartItems = (): ICartItem[] => {
  const cartItemsJson = localStorage.getItem("cartItems");
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
};

export const saveCartItems = (cartItems: ICartItem[]): void => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteCartItem = (index: number): void => {
  const cartItems = getCartItems();
  if (cartItems.length > index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    saveCartItems(cartItems); // Update the localStorage
  }
};

export const deleteAllCartItems = (): void => {
  localStorage.removeItem("cartItems"); // Remove the entire cartItems key from localStorage
};

export const editSpecificCartItem = (
  updatedCartItem: ICartItem
): void => {
  const cartItems = getCartItems();
  const index = cartItems.findIndex((item) => item.cartItemId === updatedCartItem.cartItemId);
  if (cartItems.length > index) {
    cartItems[index] = updatedCartItem; // Replace the item at the specified index with the newCartItem
    saveCartItems(cartItems); // Update the localStorage
  }
};

export const editCartItemQuantity = (
  index: number,
  newQuantity: number
): void => {
  const cartItems = getCartItems();
  if (cartItems.length > index) {
    cartItems[index].quantity = newQuantity; // Update the quantity of the specified item
    cartItems[index].bulkDiscountPercentageOff = getBulkDiscountFromQuantity(
      cartItems[index].product,
      newQuantity
    ).bulkDiscountPercentageOff;
    cartItems[index].subtotal = calculateCartItemSubtotal(cartItems[index]);
    console.log(cartItems[index]);
    saveCartItems(cartItems); // Update the localStorage
  }
};
