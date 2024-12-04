'use client';
import "@/app/client/clientStyle.css";
import React, { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';


interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  
  useEffect(() => {
    fetch('/api/mongo-test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <html lang="en">
      <head>
        <title>E-Commerce Website</title>
        <meta name="description" content="E-Commerce Website" />
      </head>
      <body>
        {/* {children} */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

export default RootLayout;
