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
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import UiPagingation from "@/components/client/ui-components/UiPagination";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

// client/product-categories/{category-id}

interface BodyComponentsProps {
  category: Category; // Define category as a prop
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
  children: string[];
}

const getSelfAndChildrenCategoryIds = (
  categories: Category[],
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
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    height: '40px',
    width: '160px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '& .MuiSelect-select': {
      padding: '8px 10px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  });

const BodyComponents: React.FC<BodyComponentsProps> = ({ category }) => {
  // Filter products based on categoryId
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

  return (
    <div>
      <Container className="max-w-container mx-auto">
        {/* Breadcrumbs */}
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            margin: "30px 0",
          }}
        >
          <CategoryBreadcrumbs mCategoryId={category.categoryId} />
        </Box>

        {/* Category Name and Description */}
        <Box>
          <Typography variant="h5" component="h1">
            {category.name}
          </Typography>
          <Typography variant="body1" component="p">
            {category.description}
          </Typography>
        </Box>

        {/* Sorting */}
        <Stack direction="row" justifyContent="right" alignItems="center">
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
          {/* selection + up and down icon */}

          <IconButton onClick={handleArrowClick} aria-label="toggle-arrow-icon">
            {isUp ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </Stack>

        <Divider />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0.5}>
            {/* Filter */}
            <Grid xs={2}>
              <UiCategoryAccordion />
            </Grid>

            {/* Product Cards */}
            <Grid xs={8}>
              <Box
                maxWidth="xl"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "0px 3px",
                }}
              >
                {filteredProducts.map((product, index) => (
                  <UiProductCard
                    key={index} // Providing index as the key
                    product={product} // Pass the entire product object
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 5}}>
          <UiPagingation />
        </Box>
      </Container>
    </div>
  );
};

export default BodyComponents;
