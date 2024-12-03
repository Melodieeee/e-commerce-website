import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FormHelperText from '@mui/material/FormHelperText';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import ProductCard from "./UiProductCard";
import { Typography, MenuItem, FormControl, Grid } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";
import { AlignHorizontalCenter } from "@mui/icons-material";

interface ProductListProps {
  products: IProduct[];
  productCategories: IProductCategory[];
}

const ProductListSwiper: React.FC<ProductListProps> = ({
  products,
  productCategories,
}) => {
  // Find categoryId is 'all'
  const allCategory = productCategories.find(
    (item) => item.categoryId === "all"
  );
  // Initial state, and set defaultCategory
  const defaultCategory =
    allCategory && allCategory.children.length > 0
      ? allCategory.children[0]
      : "";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedChildCategory, setSelectedChildCategory] = useState("");
  const [selectedSubChildCategory, setSelectedSubChildCategory] = useState("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    setSelectedChildCategory("");
    setSelectedSubChildCategory("");
  };

  const handleChildCategoryChange = (event: SelectChangeEvent) => {
    setSelectedChildCategory(event.target.value);
    setSelectedSubChildCategory("");
  };

  const handleSubChildCategoryChange = (event: SelectChangeEvent) => {
    setSelectedSubChildCategory(event.target.value);
  };

  const allChildren = allCategory ? allCategory.children : [];
  const selectedProductChildren =
    productCategories.find((item) => item.categoryId === selectedCategory)
      ?.children ?? [];
  const selectedSubProductChildren =
    productCategories.find((item) => item.categoryId === selectedChildCategory)
      ?.children ?? [];

  // Set Filtered Products
  const filteredProducts = products.filter((product) => {
    if (selectedSubChildCategory) {
      return product.categoryIds.includes(selectedSubChildCategory);
    }
    if (selectedChildCategory) {
      return product.categoryIds.includes(selectedChildCategory);
    }
    if (selectedCategory) {
      return product.categoryIds.includes(selectedCategory);
    }
    return true;
  });

  useEffect(() => {
    // Set default category
    if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }
  }, [defaultCategory]);

  // Make sure to display products
  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="max-w-5xl mx-auto p-px m-3">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", my: 3 }}>
        Product Catalog
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={2}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 0.4, textAlign: { xs: "center", sm: "center" } }}
          >
            Filter by:
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <FormControl sx={{ minWidth: 230, margin: "auto" }} size="small">
            <Select
              sx={{ fontFamily: "inherit" }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedCategory}
              onChange={handleCategoryChange}
              defaultValue={defaultCategory} // Set initial value
            >
              {productCategories.map((item) => {
                if (allChildren.includes(item.categoryId)) {
                  return (
                    <MenuItem sx={{ fontFamily: "inherit" }} key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
        </Grid>

        {/* Secent Level */}
        {selectedProductChildren.length > 0 && (
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <FormControl sx={{ minWidth: 230 }} size="small">
              <Select
                labelId="demo-select-child-label"
                defaultValue=""
                id="demo-select-child"
                value={selectedChildCategory}
                onChange={handleChildCategoryChange}
                sx={{ fontFamily: "inherit" }}
              >
              
                {selectedProductChildren.map((childId) => {
                  const childCategory = productCategories.find(
                    (item) => item.categoryId === childId
                  );
                  if (childCategory) {
                    return (
                      <MenuItem
                      sx={{ fontFamily: "inherit" }}
                        key={childCategory.categoryId}
                        value={childCategory.categoryId}
                      >
                        {childCategory.name}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
          
            </FormControl>
          </Grid>
        )}

        {/* Third Level */}
        {selectedSubProductChildren.length > 0 && (
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <FormControl className="min-w-full sm:min-w-230" sx={{ minWidth: 230 }} size="small">
              <Select
              sx={{ fontFamily: "inherit" }}
                labelId="demo-select-subchild-label"
                id="demo-select-subchild"
                value={selectedSubChildCategory}
                onChange={handleSubChildCategoryChange}
              >
                {selectedSubProductChildren.map((subChildId) => {
                  const subChildCategory = productCategories.find(
                    (item) => item.categoryId === subChildId
                  );
                  if (subChildCategory) {
                    return (
                      <MenuItem
                      sx={{ fontFamily: "inherit" }}
                        key={subChildCategory.categoryId}
                        value={subChildCategory.categoryId}
                      >
                        {subChildCategory.name}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Swiper
        
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        initialSlide={0}
        modules={[Navigation]}
        className="productListSwiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        style={{marginTop: "40px",paddingLeft: "50px"
          , paddingRight: "50px", paddingBottom: "10px", paddingTop: "10px"}}
        
      >
        {displayProducts.map((product) => (
          <SwiperSlide
            key={product.productId}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductListSwiper;
