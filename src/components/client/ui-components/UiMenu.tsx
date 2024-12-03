import React, { useState, useEffect } from "react";
import { Popper } from "@mui/base/Popper";
import MenuList from "@mui/joy/MenuList";
import MenuItem from "@mui/joy/MenuItem";
import Paper from "@mui/material/Paper";
import MenuTabs from "./UiMenuTabs";
import Box from "@mui/material/Box";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";

interface MenuProps {
  productCategories: IProductCategory[];
  hoveredTab: string | null;
  menuAnchorEl: HTMLElement | null;
  hoverTabRef: React.MutableRefObject<HTMLElement | null>;
  handleMouseEnterMenu: () => void;
  handleMouseLeaveMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({
  productCategories,
  hoveredTab,
  menuAnchorEl,
  hoverTabRef,
  handleMouseEnterMenu,
  handleMouseLeaveMenu,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (hoveredTab) {
      const firstCategory = productCategories.find((category) => category.name === hoveredTab);
      if (firstCategory && firstCategory.children.length > 0) {
        setSelectedCategoryId(firstCategory.children[0]);
      }
    }
  }, [hoveredTab, productCategories]);

  useEffect(() => {
    if (selectedCategoryId) {
      console.log(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <Popper
      open={Boolean(menuAnchorEl)}
      anchorEl={menuAnchorEl}
      placement="bottom-start"
      style={{
        width: "auto",
        zIndex: 50,
      }}
    >
      <Paper
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
        sx={{
          width: "auto",
          paddingTop: 1,
          border: "1px solid #ddd",
          boxShadow: 3,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <MenuList sx={{ padding: 2, border: "none", bgcolor: "white" }}>
            {productCategories.map((item) => {
              if (item.name === hoveredTab) {
                return item.children.map((childId) => {
                  const childItem: IProductCategory | undefined = productCategories.find(
                    (child: IProductCategory) => child.categoryId === childId
                  );
                  if (childItem) {
                    return (
                      <MenuItem
                      sx={{ fontFamily: "Montserrat" }}
                        key={childId}
                        onMouseEnter={() => {
                          setSelectedCategoryId(childItem.categoryId);
                        }}
                        onClick={() => {
                          window.location.href = `/client/product-category/${childItem.name
                            .toLowerCase()
                            .split(" ")
                            .join("-")}?id=${childItem.categoryId}`;
                        }}
                      >
                        {childItem.name}
                      </MenuItem>
                    );
                  }
                  return null;
                });
              }
              return null;
            })}
          </MenuList>
          {selectedCategoryId && (
            <MenuTabs
              productCategories={productCategories}
              selectedCategoryId={selectedCategoryId}
            />
          )}
        </Box>
      </Paper>
    </Popper>
  );
};

export default Menu;
