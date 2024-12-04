'use client';
import '@/globals.css';
import React, { useEffect } from 'react';

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
        <title>Admin Panel</title>
        <meta name="description" content="Admin Panel" />
      </head>
      <body>
        <p>Admin Panel</p>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
