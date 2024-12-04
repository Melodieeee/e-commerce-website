// This is the page for displaying all the products filtered by catefory.
// Route: /client/product-category/{categoryName}?id={categoryId}
"use client";
import React from "react";
import { useEffect } from "react";
import Layout from "@/components/client/Layout";
import BodyComponents from "@/components/client/section/bodies/ProductCategoryBody";
import NotFoundBody from "@/components/client/section/bodies/NotFoundBody";
import { useParams, useSearchParams } from "next/navigation";
import { ProductCategories } from "@/test-data/DemoComponents";

const ProductCategoriesPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>() || {
    categoryName: "",
  };
  const searchParams = useSearchParams();
  let mCategory = null;
  const categoryId = searchParams ? searchParams.get("id") : null;
  const categoryExists = ProductCategories.some((category) => {
    const correspondingName = category.name.toLowerCase().split(" ").join("-");
    if (
      categoryId === category.categoryId &&
      categoryName === correspondingName
    ) {
      mCategory = category;
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (categoryId !== null && categoryExists) {
      fetch("/api/mongo-test")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, [categoryId, categoryExists]); // Add categoryId and categoryExists to the dependency array

  return (
    <Layout>
      {categoryId !== null && categoryExists && mCategory ? (
        <BodyComponents category={mCategory} />
      ) : (
        <NotFoundBody />
      )}
    </Layout>
  );
};

export default ProductCategoriesPage;
