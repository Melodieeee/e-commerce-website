"use client";
import React from "react";
import HeaderComponents from "@/components/client/section/header/Header";
import FooterComponents from "@/components/client/section/footer/Footer";
import { CompanyInfo, ProductCategories } from "@/test-data/DemoComponents";


interface LayoutProps {
  children: React.ReactNode;
  isCartDrawerOpen?: boolean;
  setIsCartDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<LayoutProps> = ({ children, isCartDrawerOpen, setIsCartDrawerOpen }) => {
  return (
    <>
      <HeaderComponents isCartDrawerOpen={isCartDrawerOpen} setIsCartDrawerOpen={setIsCartDrawerOpen} companyInfo={CompanyInfo}/>
      <main>{children}</main>      
      <FooterComponents companyInfo={CompanyInfo} productCategories={ProductCategories}/>
    </>
  );
};

export default Layout;
