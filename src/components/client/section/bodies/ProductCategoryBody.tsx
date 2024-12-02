import React, { useState } from "react";
import UiProductCard from "@/components/client/ui-components/UiProductCard";
import UiCategoryAccordion from "../../ui-components/UiCategoryAccordion";
import { Products } from "@/test-data/DemoComponents";
import { ProductCategories } from "@/test-data/DemoComponents";
import { CategoryBreadcrumbs } from "@/components/client/ui-components/UiBreadcrumb";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { ArrowUpward, ArrowDownward, BorderAll } from "@mui/icons-material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import UiPagingation from "@/components/client/ui-components/UiPagination";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";

// client/product-categories/{category-id}

interface BodyComponentsProps {
  category: IProductCategory
}

const getSelfAndChildrenCategoryIds = (
  categories: IProductCategory[],
  categoryId: string
): string[] => {
  const filteredCategoryIds: string[] = [];

  const findCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    if (category) {
      filteredCategoryIds.push(categoryId);
      category.children.forEach((childId) => findCategory(childId));
    }
  };

  findCategory(categoryId);

  return filteredCategoryIds;
};

const StyledSelect = styled(Select)({
  border: "1px solid #ccc",
  borderRadius: "4px",
  background: "white",
  height: "40px",
  width: "160px",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "& .MuiSelect-select": {
    padding: "8px 10px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const BodyComponents: React.FC<BodyComponentsProps> = ({ category }) => {
  const selfAndChildrenCategoryIds = getSelfAndChildrenCategoryIds(
    ProductCategories,
    category.categoryId
  );
  const filteredProducts = Products.filter(
    (product) =>
      product.defaultCategoryIds.includes(category.categoryId) ||
      product.categoryIds.some((categoryId) =>
        selfAndChildrenCategoryIds.includes(categoryId)
      )
  );

  const [sort, setSort] = useState("best-seller");
  const [isUp, setIsUp] = useState(true);

  const handleArrowClick = () => {
    setIsUp(!isUp);
  };

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    setSort(event.target.value as string);
  };

  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      let comparison = 0;
  
      switch (sort) {
        case "best-seller":
          comparison = (b.sales || 0) - (a.sales || 0); // Fallback to 0 if sales is undefined
          break;
        case "popularity":
          comparison = (b.popularity || 0) - (a.popularity || 0); // Fallback to 0 if popularity is undefined
          break;
        case "price":
          comparison = (a.minSelection[1] || 0) - (b.minSelection[1] || 0); // Fallback to 0 if price is undefined
          break;
        case "product-name":
          const nameA = a.productName || ""; // Fallback to empty string if name is undefined
          const nameB = b.productName || ""; // Fallback to empty string if name is undefined
          comparison = nameA.localeCompare(nameB);
          break;
        default:
          break;
      }
  
      return isUp ? comparison : -comparison; // Reverse order if `isUp` is false
    });
  
    return sorted;
  }, [filteredProducts, sort, isUp]);
  

  return (
    <div>
      <Container className="max-w-container mx-auto">
        {/* Breadcrumbs */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: 2,
            marginTop: 4,
            marginX: 5,
          }}
        >
          <CategoryBreadcrumbs mCategoryId={category.categoryId} />
        </Box>

        {/* Category Name and Description */}
        <Box sx={{ marginX: 5 }}>
          <Typography variant="h5" component="h1">
            {category.name}
          </Typography>
          <Typography variant="body1" component="p" sx={{ paddingY: 2 }}>
            {category.description}
          </Typography>
        </Box>

        {/* Sorting */}
        <Stack direction="row" justifyContent="right" alignItems="center" sx={{ marginRight: 4 }}>
          <Typography variant="body1" component="p" marginRight={1}>
            Sort by
          </Typography>
          <StyledSelect
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={sort}
            onChange={handleSortChange}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="best-seller">Best Seller</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="product-name">Product Name</MenuItem>
          </StyledSelect>
          <IconButton onClick={handleArrowClick} aria-label="toggle-arrow-icon">
            {isUp ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </Stack>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ flexGrow: 1, marginX: 2, paddingTop: 4 }}>
          <Grid container spacing={0.5}>
            {/* Category Filter */}
            <Grid xs={2}>
              <Box sx={{ padding: 2 }}>
                <UiCategoryAccordion category={category} />
              </Box>
            </Grid>

            {/* Product Cards */}
            <Grid xs={10}>
              <Box
                maxWidth="xl"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: 2,
                  marginBottom: 2,
                  marginX: 2,
                }}
              >
                {sortedProducts.map((product, index) => (
                  <Box key={index} sx={{ marginBottom: "16px" }}>
                    <UiProductCard product={product} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 5 }}>
          <UiPagingation />
        </Box>
      </Container>
    </div>
  );
};

export default BodyComponents;

