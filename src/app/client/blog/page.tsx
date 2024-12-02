// Route: /client/blog
'use client';
//import '@/app/globals.css';
import React from 'react';
import { useEffect } from "react";
import Layout from "@/components/client/Layout";

const BlogPage = () => {

  useEffect(() => {
    fetch('/api/mongo-test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout>
      <>Blog</>
    </Layout>
  );
};

export default BlogPage;