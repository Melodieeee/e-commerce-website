//NEED TO BE MODIFIED
import React from "react";
import UiCarousel from "@/components/client/ui-components/UiCarousel";
import { UiCarouselImages } from "@/test-data/DemoComponents";
import { Box, Typography, Button, Divider } from "@mui/material";
// Icons
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ProductListSwiper from "@/components/client/ui-components/UiProductList";
// Interfaces
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { Products } from "@/test-data/DemoComponents";
import { ProductCategories } from "@/test-data/DemoComponents";

interface HomeBodyProps {

}

const BodyComponents: React.FC<HomeBodyProps> = () => {
  return (
    <div>
      <UiCarousel images={UiCarouselImages} />

      {/* Content Divider */}
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          my: 5,
        }}
        className="flex flex-col lg:flex-row items-center justify-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto">
          <Button className="text-primary">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkspacePremiumIcon sx={{ mr: 1, fontSize: 50 }} />
              <Typography variant="h5" align="center">
                PREMIUM QUALITY
              </Typography>
            </Box>
          </Button>
          <Divider
            orientation="horizontal"
            flexItem
            className="w-full my-2 lg:hidden"
          />
          <Divider
            orientation="vertical"
            flexItem
            className="mx-5 hidden lg:block"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto">
          <Button className="text-primary">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DesignServicesIcon sx={{ mr: 1, fontSize: 50 }} />
              <Typography variant="h5" align="center">
                EXCELLENT DESIGN
              </Typography>
            </Box>
          </Button>
          <Divider
            orientation="horizontal"
            flexItem
            className="w-full my-2 lg:hidden"
          />
          <Divider
            orientation="vertical"
            flexItem
            className="mx-5 hidden lg:block"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto">
          <Button className="text-primary">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MonetizationOnIcon sx={{ mr: 1, fontSize: 50 }} />
              <Typography variant="h5" align="center">
                BEST PRICE GUARANTEE
              </Typography>
            </Box>
          </Button>
        </div>
      </Box>

      {/* ProductListSwiper */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingY: 4 }}>
        <ProductListSwiper products={Products} productCategories={ProductCategories} />
      </Box>
      
    </div>
  );
};

export default BodyComponents;
