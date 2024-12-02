// Route: /client/cart
'use client';
import React from 'react';
import { useEffect } from "react";
import Layout from "@/components/client/Layout";
import BodyComponents from "@/components/client/section/bodies/CartBody";

const CartPage = () => {

  useEffect(() => {
    fetch('/api/mongo-test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout>
      <BodyComponents />
    </Layout>
  );
};

export default CartPage;