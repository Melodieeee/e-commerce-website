// Route: /client/checkout/[sessionNumber]
'use client';
//import '@/app/globals.css';
import React from 'react';
import { useEffect } from "react";
import Layout from "@/components/client/Layout";

const CheckoutPage = () => {

  useEffect(() => {
    fetch('/api/mongo-test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout>
      <>checkout</>
    </Layout>
  );
};

export default CheckoutPage;