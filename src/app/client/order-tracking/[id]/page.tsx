// The page will also display the order details and tracking information.
// The page will also provide a link to view the login page
// Route: /client/order-tracking/[id]
import React from "react";
import Layout from "@/components/client/Layout";

export default function OrderTrackingDetailPage() {
  return (
    <Layout>
      <h1>Order Tracking Detail Page</h1>
      <p>This is the order tracking detail page</p>
    </Layout>
  );
}