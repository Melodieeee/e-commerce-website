import * as React from 'react';
// Custom components
import FooterContainer from '@/components/client/section/footer/FooterContainer';
import SubscribeBar from './SubscribeBar';
// import fake data
import { CompanyInfo, ProductCategories } from '@/test-data/DemoComponents';
// Interfaces
import { ICompanyInfo } from "@/lib/models/interfaces/ICompanyInfo";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";

interface FooterProps {
  companyInfo: ICompanyInfo;
  productCategories: IProductCategory[];
}

const Footer: React.FC<FooterProps> = () => {
  return ( 
    <div>
      <SubscribeBar />
      <FooterContainer
        companyInfo={CompanyInfo}
        productCategories={ProductCategories}
      /> 
    </div>
  );
}

export default Footer;
