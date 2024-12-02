import { sign } from "crypto";

export const paths = {
    home: '/',
    client: { 
      signIn: '/client/sign-in', 
      signUp: '/client/sign-up',
      blog: '/client/blog',
      blogPost: '/client/blog/:slug',
      about: '/client/about',
      contact: '/client/contact',
      companyInfo: '/client/company-info',
      team: '/client/team',
      gallery: '/client/gallery',
      orderTracking: '/client/order-tracking',
      cart: '/client/cart',
      checkout: '/client/checkout',
      orderConfirmation: '/client/confirmation',
      prodict: '/client/product/:slug',
      producyCategory: '/client/product-category/:slug',
      profile: '/client/profile',
    },
    // admin: {
    //   overview: '/dashboard',
    //   orders: '/dashboard/orders',    
    //   customers: '/dashboard/customers',    
    //   settings: '/dashboard/settings',    
    // },
    errors: { notFound: '/errors/not-found' },
  } as const;