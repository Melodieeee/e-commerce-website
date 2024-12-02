"use client";
import React from "react";
import { useEffect, useState } from "react";
import BodyComponents from "@/components/client/section/bodies/ProductDetailBody";
import NotFoundBody from "@/components/client/section/bodies/NotFoundBody";
import { useParams, useSearchParams } from "next/navigation";
import { Products } from "@/test-data/DemoComponents";
import Layout from "@/components/client/Layout";

// client/product/{product-name}?id={product-id}
const ProductDetailPage = () => {
  const { productName } = useParams<{ productName: string }>() || {
    productName: "",
  };
  const searchParams = useSearchParams();
  let mProduct = null;
  const productId = searchParams ? searchParams.get("id") : null;
  const productExists = Products.some((product) => {
    const correspondingName = product.productName
      .toLowerCase()
      .split(" ")
      .join("-");
    if (productId === product.productId && productName === correspondingName) {
      mProduct = product;
      return true;
    }
    return false;
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    fetch("/api/mongo-test")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Layout isCartDrawerOpen={isCartDrawerOpen} setIsCartDrawerOpen={setIsCartDrawerOpen}>
      {productId !== null && productExists && mProduct ? (
        <BodyComponents product={mProduct} setIsCartDrawerOpen={setIsCartDrawerOpen}/>
      ) : (
        <NotFoundBody />
      )}
    </Layout>
  );
};

export default ProductDetailPage;
