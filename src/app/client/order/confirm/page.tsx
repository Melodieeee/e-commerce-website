// This page is the confirmation page for the client after placing an order. 
// It displays a confirmation message and the order details.
// also sending confirmation email and text message.
// Route: /client/confimation
import React from "react";
import Layout from "@/components/client/Layout";

export default function OrderComfirmPage() {
  return (
    <Layout>
      <h1>Order Comfirm Page</h1>
      <p>This is the order confirm page</p>
    </Layout>
  );
}