// This is the page for confirming the email address of the client. 
// The client will be redirected to this page after clicking the confirmation link 
// in the email sent to them. The page will display a message confirming that the email address 
// has been confirmed and provide a link to the login page.
// Route: /client/sign-up/confirm
import React from "react";
import Layout from "@/components/client/Layout";

export default function SignUpConfirmPage() {
  return (
    <Layout>
      <h1>Sign Up Comfirm Page</h1>
      <p>This is the sign up confirm page</p>
    </Layout>
  );
}
