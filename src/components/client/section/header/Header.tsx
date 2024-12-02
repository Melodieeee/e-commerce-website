import * as React from 'react';
// Custom components
import UiPromotionBar from '@/components/client/ui-components/UiStickyHeader';
import UiTabNavBar from '@/components/client/ui-components/UiTabNavBar'
import HeaderContainer from '@/components/client/section/header/HeaderContainer';
// import fake data
import { ProductCategories, CompanyInfo } from '@/test-data/DemoComponents';
// Interfaces
import { ICompanyInfo } from "@/lib/models/interfaces/ICompanyInfo";

interface HeaderProps {
  isCartDrawerOpen?: boolean;
  setIsCartDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  companyInfo: ICompanyInfo;
}

const Header: React.FC<HeaderProps> = ({ isCartDrawerOpen, setIsCartDrawerOpen }) => {
  return ( 
    <div>
      <UiPromotionBar />      
      <HeaderContainer
        isCartDrawerOpen={isCartDrawerOpen}
        setIsCartDrawerOpen={setIsCartDrawerOpen}
        companyInfo={CompanyInfo}
      />
      <UiTabNavBar productCategories={ProductCategories} />
    </div>
  );
}

export default Header;
