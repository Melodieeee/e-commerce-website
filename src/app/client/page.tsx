"use client";
import React from "react";
import Layout from "@/components/client/Layout";
import BodyComponents from "@/components/client/section/bodies/HomeBody";
// /client
export default function HomePage() {
  return (
    <Layout>
      <BodyComponents />
    </Layout>
  );
}

// export async function generateStaticParams() {
//   return [
//     { params: { slug: "client" } }, // Example static route for 'client'
//     // Add more static routes if needed
//   ];
// }
