import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/joy";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";
import { Products } from "@/test-data/DemoComponents";
import ProductCard from "@/components/client/ui-components/UiMenuProductCard";

interface TabsProps {
  productCategories: IProductCategory[];
  selectedCategoryId: string;
}

const TabsSegmentedControls: React.FC<TabsProps> = ({
  productCategories,
  selectedCategoryId,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const selectedCategory: IProductCategory | undefined = productCategories.find(
    (category: IProductCategory) => category.categoryId === selectedCategoryId
  );

  const thirdLevelCategories: IProductCategory[] = selectedCategory
    ? selectedCategory.children
        .map((childId: string) =>
          productCategories.find(
            (category: IProductCategory) => category.categoryId === childId
          )
        )
        .filter(
          (category): category is IProductCategory => category !== undefined
        )
    : [];

  const handleTabHover = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <Tabs
      aria-label="tabs"
      value={selectedTabIndex}
      onChange={(_, newValue) => setSelectedTabIndex(Number(newValue))}
      sx={{ bgcolor: "transparent", flexWrap: "wrap" }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 1,
          gap: 1,
          borderRadius: "xl",
          bgcolor: "background.level1",
          flexWrap: "wrap",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: "sm",
            bgcolor: "background.surface",
          },
        }}
      >
        {thirdLevelCategories.map((category: IProductCategory, index) => (
          <Tab
            sx={{ fontFamily: "Montserrat" }}
            key={category.categoryId}
            disableIndicator
            value={index}
            onMouseEnter={() => handleTabHover(index)} // Changes the tab on hover
            onMouseDown={() => {
              // Redirect on click
              window.location.href = `/client/product-category/${category.name
                .toLowerCase()
                .split(" ")
                .join("-")}?id=${category.categoryId}`;
            }}
          >
            {category.name}
          </Tab>
        ))}
      </TabList>

      {thirdLevelCategories.map((category: IProductCategory, index) => {
        const filteredProducts = Products.filter((product: IProduct) =>
          product.categoryIds.includes(category.categoryId)
        );

        return (
          <TabPanel key={category.categoryId} value={index} color="primary">
            <ProductCard products={filteredProducts} />
          </TabPanel>
        );
      })}
    </Tabs>
  );
};

export default TabsSegmentedControls;
