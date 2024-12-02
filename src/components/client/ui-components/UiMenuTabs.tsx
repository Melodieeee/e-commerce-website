import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/joy";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Product } from "@/lib/models/interfaces/IProduct";
import { ProductCategory } from "@/lib/models/interfaces/IProductCategory";
import { Products } from "@/test-data/DemoComponents";
import ProductCard from "@/components/client/ui-components/UiMenuProductCard";

interface TabsProps {
  productCategories: ProductCategory[];
  selectedCategoryId: string;
}

const TabsSegmentedControls: React.FC<TabsProps> = ({
  productCategories,
  selectedCategoryId,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const selectedCategory: ProductCategory | undefined = productCategories.find(
    (category: ProductCategory) => category.categoryId === selectedCategoryId
  );

  const thirdLevelCategories: ProductCategory[] = selectedCategory
    ? selectedCategory.children
        .map((childId: string) =>
          productCategories.find(
            (category: ProductCategory) => category.categoryId === childId
          )
        )
        .filter(
          (category): category is ProductCategory => category !== undefined
        )
    : [];

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | number | null
  ) => {
    if (typeof newValue === 'number') {
      setSelectedTabIndex(newValue);
    }
  };

  return (
    <Tabs
      aria-label="tabs"
      value={selectedTabIndex}
      onChange={handleTabChange}
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
        {thirdLevelCategories.map((category: ProductCategory, index) => (
          <Tab key={category.categoryId} disableIndicator value={index}>
            {category.name}
          </Tab>
        ))}
      </TabList>
      {thirdLevelCategories.map((category: ProductCategory, index) => {
        const filteredProducts = Products.filter((product: Product) =>
          product.categoryIds.includes(category.categoryId)
        );

        return (
          <TabPanel
            key={category.categoryId}
            value={index}
            color="primary"
          >
            <ProductCard
              products={filteredProducts}  
            />
          </TabPanel>
        );
      })}
    </Tabs>
  );
};

export default TabsSegmentedControls;
