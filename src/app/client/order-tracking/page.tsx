// This page is for tracking the order of the client. 
// The page will display a form for clients to enter their order ID and track the status of their order. 
// Route: /client/order-tracking
'use client';
//import '@/app/globals.css';
import React from 'react';
import { useEffect } from "react";
import Layout from "@/components/client/Layout";

const OrderTrackingPage = () => {

  useEffect(() => {
    fetch('/api/mongo-test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout>
      <>OrderTracking</>
    </Layout>
  );
};

export default OrderTrackingPage;