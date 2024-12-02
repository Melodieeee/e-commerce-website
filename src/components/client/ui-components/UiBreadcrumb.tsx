import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { ProductCategories } from "@/test-data/DemoComponents";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";
import { IProduct } from "@/lib/models/interfaces/IProduct";


interface ProductBreadcrumbsProps {
  product: IProduct;
}

interface CategoryBreadcrumbsProps {
  mCategoryId: string;
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ product }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (product) {
      // Find category hierarchy based on productCategoryIds
      const categoryHierarchy = product.defaultCategoryIds.map((categoryId) => {
        const category = ProductCategories.find(
          (cat: IProductCategory) => cat.categoryId === categoryId
        );
        return category ? category : categoryId;
      });
      // Build breadcrumbs array
      const breadcrumbLinks = categoryHierarchy.map((cat, index) => {
        if (typeof cat === "string") {
          return <span key={index}>{cat}</span>;
        } else {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={`/client/product-category/${cat.name
                .toLowerCase()
                .split(" ")
                .join("-")}?id=${cat.categoryId}`}
            >
              {cat.name}
            </Link>
          );
        }
      });

      // Add product name as the final breadcrumb
      breadcrumbLinks.push(
        <Typography key="product" color="text.primary">
          {product.productName}
        </Typography>
      );

      setBreadcrumbs(breadcrumbLinks);
    }
  }, [product]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
  mCategoryId,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (mCategoryId && ProductCategories.length > 0) {
      const categoryHierarchy: IProductCategory[] = [];

      // Find the category object with the matching categoryName
      const currentCategory = ProductCategories.find(
        (category) => category.categoryId === mCategoryId
      );

      // If the current category is found
      if (currentCategory) {
        // Add a breadcrumb for each level of the category hierarchy
        let parentCategory = currentCategory;
        while (parentCategory) {
          categoryHierarchy.unshift(parentCategory);

          // Find the parent category
          parentCategory = ProductCategories.find((category) =>
            category.children.includes(parentCategory.categoryId)
          ) as IProductCategory;
        }
      }

      // Build breadcrumbs array
      const breadcrumbLinks = categoryHierarchy.map((category, index) => (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          href={`/client/product-category/${category.name
            .toLowerCase()
            .split(" ")
            .join("-")}?id=${category.categoryId}`}
        >
          {category.name}
        </Link>
      ));

      setBreadcrumbs(breadcrumbLinks);
    }
  }, [mCategoryId]);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export { ProductBreadcrumbs, CategoryBreadcrumbs };
