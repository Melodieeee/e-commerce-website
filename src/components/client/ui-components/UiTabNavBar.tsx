import React, { useState, useRef } from "react";
import Menu from "./UiMenu";

interface TabNavBarProps {
  productCategories: ProductCategory[];
}

interface ProductCategory {
  categoryId: string;
  name: string;
  description: string;
  children: string[];
}

export default function TabNavBar({ productCategories }: TabNavBarProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const hoverTabRef = useRef<HTMLElement | null>(null);

  const handleMouseEnterTab = (
    event: React.MouseEvent<HTMLDivElement>,
    itemName: string
  ) => {
    setHoveredTab(itemName);
    setMenuAnchorEl(event.currentTarget);
    hoverTabRef.current = event.currentTarget as HTMLElement;
  };

  const handleMouseLeaveTab = () => {
    setHoveredTab(null);
    setMenuAnchorEl(null);
    hoverTabRef.current = null;
  };

  const handleMouseEnterMenu = () => {
    // Add logic if needed when mouse enters the menu
  };

  const handleMouseLeaveMenu = () => {
    setMenuAnchorEl(null);
  };

  const allChildrenIds =
    productCategories.find((item) => item.categoryId === "all")?.children ?? [];

  return (
    <div
      className="w-full bg-primary hidden xl:flex"
      onMouseLeave={handleMouseLeaveTab}
    >
      <div className="flex max-w-container mx-auto w-full">
        {productCategories.map((item, index) => {
          if (allChildrenIds.includes(item.categoryId)) {
            return (
              <div
                key={item.categoryId}
                className="relative text-white text-center p-4 flex-grow cursor-pointer overflow-hidden"
                onMouseEnter={(e) => handleMouseEnterTab(e, item.name)}
                onClick={() => {
                  window.location.href = `/client/product-category/${item.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}?id=${item.categoryId}`;
                }}
              >
                {item.name}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-secondary transition-all duration-300 ease-linear ${
                    hoveredTab === item.name ? "w-full" : "w-0"
                  }`}
                />
              </div>
            );
          }
          return null;
        })}

        <Menu
          productCategories={productCategories}
          hoveredTab={hoveredTab}
          menuAnchorEl={menuAnchorEl}
          hoverTabRef={hoverTabRef}
          handleMouseEnterMenu={() => {}}
          handleMouseLeaveMenu={handleMouseLeaveTab}
        />
      </div>
    </div>
  );
}
