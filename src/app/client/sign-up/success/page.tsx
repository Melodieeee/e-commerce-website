// This is the page when the client successfully signs up.
// The client will be redirected to this page after successfully signing up.
// Route: /client/sign-up/success
import React from "react";
import Layout from "@/components/client/Layout";

export default function SignUpSuccessPage() {
  return (
    <Layout>
      <h1>Sign Up Success Page</h1>
      <p>This is the sign up success page</p>
    </Layout>
  );
}