"use client";
import React, { useEffect } from "react";
import BodyComponents from "@/components/client/section/bodies/CartEditProductBody";
import NotFoundBody from "@/components/client/section/bodies/NotFoundBody";
import { useParams, useSearchParams } from "next/navigation";
import { Products } from "@/test-data/DemoComponents";
import Layout from "@/components/client/Layout";
import { useCart } from "@/context/CartContext"; // Import the useCart hook

// client/cart/edit/{editProductName}?id={product-id}
const CartEditProductPage = () => {
  const { cartItemId } = useParams<{ cartItemId: string }>() || { cartItemId: "" };
  const { editProductName } = useParams<{ editProductName: string }>() || {
    editProductName: "",
  };
  const searchParams = useSearchParams();
  const { cartItems } = useCart(); // Use the useCart hook to access cartItems

  let mProduct = null;
  const productId = searchParams ? searchParams.get("id") : null;
  const productExists = Products.some((product) => {
    const correspondingName = product.productName
      .toLowerCase()
      .split(" ")
      .join("-");
    if (productId === product.productId && editProductName === correspondingName) {
      mProduct = product;
      return true;
    }
    return false;
  });

  let editCartItem = null;
  const cartItemExists = cartItems.some((cartItem) => {
    if (cartItemId === cartItem.cartItemId.toString()) {
      editCartItem = cartItem;
      return true;
    }
    return false;
  });

  useEffect(() => {
    fetch("/api/mongo-test")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout>
      {productId !== null && productExists && mProduct && 
      cartItemId !== null && cartItemExists && editCartItem ? (
        <BodyComponents product={mProduct} cartItem={editCartItem}/>
      ) : (
        <NotFoundBody />
      )}
    </Layout>
  );
};

export default CartEditProductPage;
